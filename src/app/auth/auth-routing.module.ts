import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CreateuserPageComponent } from './pages/createuser-page/createuser-page.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'register' ,
        component: RegisterPageComponent
    },
    {
        path: 'create-user',
        component: CreateuserPageComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule{}
  