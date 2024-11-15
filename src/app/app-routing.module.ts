import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserSettingsComponent } from './user/components/user-settings/user-settings.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { CreateUserComponent } from './auth/components/create-user/create-user.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/components/checkout/checkout.component';
import { ReceiptListComponent } from './receipts/components/receipt-list/receipt-list.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { ReceiptDetailComponent } from './receipts/components/receipt-detail/receipt-detail.component';
import { AboutComponent } from './about/components/about/about.component';
import { RegisterProductComponent } from './products/components/register-product/register-product.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainComponent } from './home/pages/main.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [

  {path:'',redirectTo:'/index',pathMatch:'full'},
  {path:'index',component: MainComponent},
  
  {
    path : 'auth' , pathMatch: 'full'
    , loadChildren: () => import ('./auth/auth.module').then(module => module.AuthModule)
  },
  
  {path:'comprobantes',component:  ReceiptListComponent},
  {path:'detalle-comprobante',component: ReceiptDetailComponent},
  
  {path:'nosotros',component: AboutComponent},

  {path:'nav',component: NavComponent},
  {path:'footer',component: FooterComponent},

  
  {path:'productos',component: ProductListComponent},
  {path:'detalle-producto',component: ProductDetailComponent},
  
  {path:'settings',component: UserSettingsComponent},
  {path:'registrar-producto',component: RegisterProductComponent},

  {path: 'checkout', component: CheckoutComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
