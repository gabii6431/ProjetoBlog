import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ApiService } from '../service/api.service';
import { Cadastro } from '../shared/cadastro.model'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //Cadastro
  public cadastro: Cadastro = new Cadastro()

  public fullname: string = ''
  public username: string = ''
  public email: string = ''

  //controle de validação dos campos
  public fullnameValido : boolean
  public usernameValido : boolean
  public emailValido : boolean

  //controlar botao confirmar compra
  //public formEstado: string = 'disable'

  constructor(private _api: ApiService) { }

  ngOnInit() {
    //this.cadastrarService.efetivarCadastro()
  }

  public atualizaFullname(fullname: string): void {
    this.fullname = fullname
    
    if(this.fullname.length > 0){
      this.fullnameValido = true
    }else{
      this.fullnameValido = false
    }
  }

  public atualizaUsername(username: string): void {
    this.username = username
    if(this.username.length > 0){
      this.usernameValido = true
    }else{
      this.usernameValido = false
    }
  }

  public atualizaEmail(email: string): void {
    this.email = email
    if(this.email.length > 0){
      this.emailValido = true
    }else{
      this.emailValido = false
    }
  }

  public confirmarCadastro(): void{
    this.cadastro.fullname = this.fullname
    this.cadastro.username = this.username
    this.cadastro.email = this.email
    this._api.addUser(this.cadastro)
  }
}
