import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Comentario } from 'src/model/comment';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  userForm: FormGroup;
  public post_id: number

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.appService.setTitle('New Comment');
    this.userForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'email': [null, Validators.required],
      'post_id': parseInt(this.route.snapshot.params['id'])
    });
  }

  addComment(form: NgForm) {
    this._api.addComment(form).subscribe(err => {
      console.log(err);
    });
    this.userForm.controls['title'].setValue("");
    this.userForm.controls['title'].setErrors(null);
    this.userForm.controls['body'].setValue("");
    this.userForm.controls['body'].setErrors(null);
    this.userForm.controls['email'].setValue("");
    this.userForm.controls['email'].setErrors(null);
  }

}
