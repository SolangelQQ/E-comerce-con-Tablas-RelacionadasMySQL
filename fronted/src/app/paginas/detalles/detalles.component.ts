import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    productoService: ProductoService = inject(ProductoService);
    detalleProducto: Product | undefined; 
    constructor() {
      const idProducto =
    Number(this.route.snapshot.params['id']); 
    //this.detalleProducto = this.productoService.obtenerProductoPorId(idProducto) 
    //console.log(this.detalleProducto)
    this.productoService.obtenerProductoPorId(idProducto). subscribe(
      data => this.detalleProducto = data )
  }
}
// constructor() { 
//   const idProducto = Number(this.route.snapshot.params['id']); 
//   // this.detalleProducto = this.productoService.obtenerProductoPorId(idProducto)
//   this.productoService.obtenerProductoPorId(idProducto). 
//   subscribe(
//   data => this.detalleProducto = data 
//  )
// }
