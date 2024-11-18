import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { ReceiptdetailPageComponent } from './pages/receiptdetail-page/receiptdetail-page.component';
import { HeadReceiptComponent } from './components/receipt-detai-components/head-receipt/head-receipt.component';
import { CustomerDataComponent } from './components/receipt-detai-components/customer-data/customer-data.component';
import { TableDetailComponent } from './components/receipt-detai-components/table-detail/table-detail.component';
import { RouterModule } from '@angular/router';
import { ReceiptRoutingModule } from './receipts-routing.module';



@NgModule({
  declarations: [
    ReceiptListComponent,
    ReceiptdetailPageComponent,
    HeadReceiptComponent,
    CustomerDataComponent,
    TableDetailComponent
  ],
  imports: [
    CommonModule,
    ReceiptRoutingModule
  ],
  exports:[
    ReceiptListComponent,
    ReceiptdetailPageComponent,
    HeadReceiptComponent,
    CustomerDataComponent,
    TableDetailComponent
  ]
})
export class ReceiptsModule { }
