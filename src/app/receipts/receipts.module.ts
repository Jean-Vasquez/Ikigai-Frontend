import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';



@NgModule({
  declarations: [
    ReceiptListComponent,
    ReceiptDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ReceiptDetailComponent,
    ReceiptListComponent
  ]
})
export class ReceiptsModule { }
