import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ProductSummaryComponent } from './components/product-summary/product-summary.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { RouterModule } from '@angular/router';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    CheckoutPageComponent,
    CustomerFormComponent,
    ProductSummaryComponent,
    PaymentSummaryComponent,
    CardFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CheckoutRoutingModule,
    AuthModule
  ],
  exports:[
    CheckoutPageComponent,
    CustomerFormComponent,
    ProductSummaryComponent,
    PaymentSummaryComponent,
    CardFormComponent
  ]
})
export class CheckoutModule { }
