import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { RegisterproductPageComponent } from "./pages/registerproduct-page/registerproduct-page.component";
import { ProductsPageComponent } from "./pages/products-page/products-page.component";

const routes : Routes = [
  {path:'product-list',component: ProductsPageComponent},
  {path:'product-detail',component: ProductDetailComponent},
  {path: 'add-product', component: RegisterproductPageComponent},
  {path: '**', redirectTo: 'product-list'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule{}