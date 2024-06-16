import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { CarritoService } from '../../servicios/carrito.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit{
  public productos: Product[]=[];
  public total: number=0;
  constructor(private carritoService: CarritoService){}
  ngOnInit(): void {
      this.carritoService.obtenerProductos().subscribe(res=>{
        this.productos = res;
        this.total = this.carritoService.getPrecioTotal();
      })
  }

  removerProducto(item: Product){
    this.carritoService.removerProductoDeCarrito(item);
  }

  vaciarCarrito(){
    this.carritoService.vaciarCarrito();
  }
}
