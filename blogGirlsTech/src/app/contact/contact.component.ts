import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Contact } from 'src/model/contact';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.setTitle('New Contact');
    this.userForm = this.formBuilder.group({
      'nome': [null, Validators.required],
      'email': [null, Validators.required],
      'message': [null, Validators.required]
    });
  }

  addContact(form: NgForm) {
    this._api.addContact(form).subscribe(err => {
      console.log(err);
    });
    this.userForm.controls['nome'].setValue("");
    this.userForm.controls['nome'].setErrors(null);
    this.userForm.controls['email'].setValue("");
    this.userForm.controls['email'].setErrors(null);
    this.userForm.controls['message'].setValue("");
    this.userForm.controls['message'].setErrors(null);
  }

  resetForm(){
    this.userForm.controls['nome'].setValue("");
    this.userForm.controls['nome'].setErrors(null);
    this.userForm.controls['email'].setValue("");
    this.userForm.controls['email'].setErrors(null);
    this.userForm.controls['message'].setValue("");
    this.userForm.controls['message'].setErrors(null);
  }

}
