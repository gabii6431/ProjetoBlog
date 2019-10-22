import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Usuario } from 'src/model/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private appService: AppService) { }

  ngOnInit() {
    this.appService.setTitle('Novo Usuário');
    this.userForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'username': [null, Validators.required],
      'email': [null, Validators.required]
    });
  }

  addUser(form: NgForm) {
    this._api.addUser(form).subscribe(err => {
      console.log(err);
    });
    this.userForm.controls['name'].setValue("");
    this.userForm.controls['name'].setErrors(null);
    this.userForm.controls['username'].setValue("");
    this.userForm.controls['username'].setErrors(null);
    this.userForm.controls['email'].setValue("");
    this.userForm.controls['email'].setErrors(null);
  }

}
