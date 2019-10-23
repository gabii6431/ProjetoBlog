import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Post } from 'src/model/post';
import { ApiService } from '../service/api.service';
import { AppService } from '../service/app.service';
import {ActivatedRoute} from '@angular/router'
import { readSync } from 'fs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postForm: FormGroup;
  public post_id: number


  constructor(
    private router: Router,
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.appService.setTitle('Página Principal');
    this._api.getPost(parseInt(this.route.snapshot.params['id'])).subscribe(res => {
      this.postForm.controls['title'].setValue(res[0].title);
      this.postForm.controls['title'].setErrors(null);
      this.postForm.controls['body'].setValue(res[0].body);
      this.postForm.controls['body'].setErrors(null);

    }, err => {
      console.log(err);
    });


    this.postForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'post_id': parseInt(this.route.snapshot.params['id'])
    });
  }

  updatePost(form: NgForm) {
    this._api.updatePost(parseInt(this.route.snapshot.params['id']),form).subscribe(res => {
      console.log(form)
    }, (err) => {
      console.log(err);
    });
    this.postForm.controls['title'].setValue("");
    this.postForm.controls['title'].setErrors(null);
    this.postForm.controls['body'].setValue("");
    this.postForm.controls['body'].setErrors(null);
  }

}
