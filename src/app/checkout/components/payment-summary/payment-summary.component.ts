import { Component } from '@angular/core';
import { CheckoutService } from '../../services/Checkout.service';
import { Router } from '@angular/router';
import { DatosVenta, DetalleVenta } from '../../interfaces/data/dataVenta.interface';

@Component({
  selector: 'checkout-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrl: './payment-summary.component.css'
})
export class PaymentSummaryComponent {
    constructor(private checkoutService : CheckoutService, private router: Router){}

    public subTotal : number|undefined
    public total: number|undefined  
    public datosDetVent : DetalleVenta[] = []
    public datosVenta : DatosVenta = {
      detalleVenta: this.datosDetVent,
      metpago: '' , 
      usuario: '',

    }

    ngOnInit(): void {
      this.cargarTotalAPagar()    
    }
  

    cargarTotalAPagar(){
      this.checkoutService.cargarProducto().subscribe({
        next: (value) => {
            this.subTotal = value.precio
            if(localStorage.getItem('stock')){
            const cantidad = JSON.parse(localStorage.getItem('stock')!)
            this.total = this.subTotal * cantidad
              }
          }
      })
    } 


    datosParaVenta(){
      const usuarioId = localStorage.getItem('usuarioId')!
      const idProducto = localStorage.getItem('compra')!
      if(localStorage.getItem('stock')){
        const cantidad = JSON.parse(localStorage.getItem('stock')!)
      this.datosDetVent = [
        {
        cantidadprod: cantidad,
        idproducto: idProducto
      }
      ]}

      this.datosVenta = {
        metpago: 'tarjeta',
        usuario: usuarioId,
        detalleVenta: this.datosDetVent
      }

      this.realizarVenta(this.datosVenta)
      this.router.navigateByUrl('/receipt/receipt-list')

    }




    realizarVenta(venta: DatosVenta){
      this.checkoutService.realizarVenta(venta).subscribe()
    }

}
