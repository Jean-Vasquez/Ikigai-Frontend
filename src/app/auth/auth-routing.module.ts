import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: LoginComponent
    },
    {
        path: 'create-user',
        component: LoginComponent



         
         
         


        
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
  