import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { RegisterproductPageComponent } from "./pages/registerproduct-page/registerproduct-page.component";
import { ProductsPageComponent } from "./pages/products-page/products-page.component";

import { ProductformComponent } from "./components/products-page-components/productform/productform.component";

import { rolGuard } from "../auth/guard/rol.guard";
import { authGuard } from "../auth/guard/auth.guard";


const routes : Routes = [
  {path:'product-list',component: ProductsPageComponent},
  {path:'product-detail/:id',component: ProductDetailComponent},
  {path: 'add-product',  canActivate: [authGuard,rolGuard] ,  component: RegisterproductPageComponent},
  {path: 'edit-product/:id', component: ProductformComponent},
  {path: '**', redirectTo: 'product-list'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule{}