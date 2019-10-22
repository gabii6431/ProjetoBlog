import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Usuario } from 'src/model/user';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;
  users: string[] = ['username', 'id'];
  dataSource: Usuario[];

  constructor(
    private router: Router,
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private appService: AppService) { }

  ngOnInit() {
    this.appService.setTitle('Novo Post');
    this._api.getUsers().subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });
    this.postForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'user_id': [null, Validators.required]
    });
  }

  addPost(form: NgForm) {
    this._api.addPost(form).subscribe(res => {
      console.log(form)
    }, (err) => {
      console.log(err);
    });
    this.postForm.controls['title'].setValue("");
    this.postForm.controls['title'].setErrors(null);
    this.postForm.controls['body'].setValue("");
    this.postForm.controls['body'].setErrors(null);
    this.postForm.controls['user_id'].setValue(0);
    this.postForm.controls['user_id'].setErrors(null);
  }
}
