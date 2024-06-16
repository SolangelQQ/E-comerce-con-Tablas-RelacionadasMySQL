import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink, ProductoComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent{
  // public Product
  @Input() producto!: Product;
  constructor(private carritoService: CarritoService){

  }

  addToCart(producto: Product){
    this.carritoService.addToCart(producto); 
  }

  
}
