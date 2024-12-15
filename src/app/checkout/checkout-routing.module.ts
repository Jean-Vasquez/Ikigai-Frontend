import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";
import { authGuard } from "../auth/guard/auth.guard";


const routes : Routes  = [
    {
        path: 'overview',  canActivate: [authGuard],
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