import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutModule } from './checkout/checkout.module';
import { ProductsModule } from './products/products.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReceiptsModule,
    UserModule,
    HomeModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    CheckoutModule,
    ProductsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
