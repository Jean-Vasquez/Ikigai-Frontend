import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FormsModule} from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { RegisterproductPageComponent } from './pages/registerproduct-page/registerproduct-page.component';
import { ProductformComponent } from './components/products-page-components/productform/productform.component';
import { ProductstableComponent } from './components/products-page-components/productstable/productstable.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SearchBarComponent } from './components/products-page-list/search-bar/search-bar.component';
import { CategoriesComponent } from './components/products-page-list/categories/categories.component';

import { PaginationComponent } from './components/products-page-list/pagination/pagination.component';
import { ProductsComponent } from './components/products-page-list/products/products.component';
import { CartComponent } from './components/products-page-list/cart/cart.component';
import { UserService } from '../user/services/User.service';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsPageComponent,
    RegisterproductPageComponent,
    ProductformComponent,
    ProductstableComponent,
    SearchBarComponent,
    CategoriesComponent,
    CartComponent,
    PaginationComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    UserModule,
    ProductsRoutingModule,

  ],exports:[
    ProductDetailComponent,
    ProductsPageComponent,
    RegisterproductPageComponent,
    ProductformComponent,
    ProductstableComponent,
    SearchBarComponent,
    CategoriesComponent,
    CartComponent,
    PaginationComponent,
    ProductsComponent
  ]
})
export class ProductsModule { }
