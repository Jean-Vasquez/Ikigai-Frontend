import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserSettingsComponent } from './user/components/user-settings/user-settings.component';
import { AboutComponent } from './about/components/about/about.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainComponent } from './home/pages/main.component';


import { publicGuard } from './auth/guard/public.guard';


const routes: Routes = [

 
  
  
  {path:'about',component: AboutComponent},


  {path:'nav',component: NavComponent},
  {path:'footer',component: FooterComponent},

  {path:'',redirectTo:'/index',pathMatch:'full'},
  {path:'home',component: MainComponent},
  
  {path:'settings',  canActivate: [publicGuard], component: UserSettingsComponent},

  {path : 'auth', 
    loadChildren: () => import ('./auth/auth.module').then(module => module.AuthModule)
  },
  {path: 'checkout'  , 
     loadChildren: () => import('./checkout/checkout.module').then(module => module.CheckoutModule)  
  },  
  {path: 'products',
      loadChildren: () => import('./products/products.module').then(module => module.ProductsModule)
  },
  {path : 'receipts', 
    loadChildren: () => import ('./receipts/receipts.module').then(module => module.ReceiptsModule)
  },
  {path: '**' , redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
