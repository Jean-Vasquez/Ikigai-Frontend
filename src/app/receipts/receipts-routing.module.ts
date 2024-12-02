import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceiptdetailPageComponent } from "./pages/receiptdetail-page/receiptdetail-page.component";
import { ReceiptListComponent } from "./components/receipt-list/receipt-list.component";
import { publicGuard } from "../auth/guard/public.guard";

const routes: Routes =[

  {path:'receipt-list',  canActivate:[publicGuard] , component:  ReceiptListComponent},
  {path:'receipt-detail',  canActivate:[publicGuard],component: ReceiptdetailPageComponent},
  {path: '**', redirectTo: 'receipt-list'}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ReceiptRoutingModule{}