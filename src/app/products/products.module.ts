import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    RegisterProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule, RouterModule
  ],exports:[
    ProductListComponent,
    ProductDetailComponent,
    RegisterProductComponent
  ]
})
export class ProductsModule { }
