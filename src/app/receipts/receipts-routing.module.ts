import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceiptdetailPageComponent } from "./pages/receiptdetail-page/receiptdetail-page.component";
import { ReceiptListComponent } from "./components/receipt-list/receipt-list.component";
import { authGuard } from "../auth/guard/auth.guard";

const routes: Routes =[

  {path:'receipt-list',  canActivate:[authGuard] , component:  ReceiptListComponent},
  {path:'receipt-detail',  canActivate:[authGuard],component: ReceiptdetailPageComponent},
  {path: '**', redirectTo: 'receipt-list'}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ReceiptRoutingModule{}