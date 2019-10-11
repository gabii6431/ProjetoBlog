import { Routes } from '@angular/router'

import {PainelComponent} from './painel/painel.component'
import {LoginComponent} from './login/login.component'
import {CadastroComponent} from './cadastro/cadastro.component'
import {HomeComponent} from './home/home.component'

export const ROUTES: Routes = [
    {path: "", component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'painel', component: PainelComponent},
    {path: 'home', component: HomeComponent}
    
]