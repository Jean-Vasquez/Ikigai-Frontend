import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';


import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreateuserPageComponent } from './pages/createuser-page/createuser-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CreateUserComponent,
    LoginPageComponent,
    CreateuserPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ], exports:[
    LoginComponent,
    RegisterComponent,
    CreateUserComponent,
    LoginPageComponent,
    CreateuserPageComponent,
    RegisterPageComponent
  ]
})
export class AuthModule { }
