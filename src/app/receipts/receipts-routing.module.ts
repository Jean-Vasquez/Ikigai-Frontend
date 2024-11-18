import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceiptdetailPageComponent } from "./pages/receiptdetail-page/receiptdetail-page.component";
import { ReceiptListComponent } from "./components/receipt-list/receipt-list.component";

const routes: Routes =[
  {path:'receipt-list',component:  ReceiptListComponent},
  {path:'receipt-detail',component: ReceiptdetailPageComponent},
  {path: '**', redirectTo: 'receipt-list'}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ReceiptRoutingModule{}