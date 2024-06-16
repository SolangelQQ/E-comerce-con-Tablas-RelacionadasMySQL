import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup-producto.component.html',
  styleUrls: ['./popup-producto.component.scss']
})
export class PopupProductoComponent {
  @Output() productoAgregado = new EventEmitter<Product>();
  @Output() cerrar = new EventEmitter<void>();

  producto: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  };

  agregarProducto() {
    this.productoAgregado.emit(this.producto);
    this.cerrar.emit();
  }

  cerrarPopup() {
    this.cerrar.emit();
  }
}
