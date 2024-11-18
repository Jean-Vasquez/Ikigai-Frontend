import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";


const routes : Routes  = [
    {
        path: 'overview',
        component: CheckoutPageComponent
    },
    {
        path:'**',
        redirectTo: 'overview'
    }
] 




@NgModule({
    imports: [
        RouterModule.forChild(routes)
        
    ],
    exports: [
        RouterModule
    ]
})
export class CheckoutRoutingModule{}