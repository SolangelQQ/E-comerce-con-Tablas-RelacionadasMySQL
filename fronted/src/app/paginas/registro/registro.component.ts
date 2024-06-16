import { Component } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { FormsModule } from '@angular/forms';
import { PopupProductoComponent } from '../../elementos/popup-producto/popup-producto.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoComponent, PopupProductoComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

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

  public listaDeProductos: Product[] = [];
  public mostrarPopup = false;
  public mostrarMensajeExitoso = false;

  constructor(private productoServicio: ProductoService) { }

  ngOnInit(): void {
    this.productoServicio.obtenerTodosLosProductos().subscribe(
      datos => this.listaDeProductos = datos,
      error => console.log(error)
    );
  }

  abrirPopup(event: Event) {
    event.preventDefault();
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
  }

  agregarProducto(producto: Product) {
    this.productoServicio.agregarProducto(producto).subscribe(res => {
      this.productoServicio.obtenerTodosLosProductos().subscribe(
        datos => this.listaDeProductos = datos
      );
      this.mostrarMensajeExitoso = true;
      setTimeout(() => {
        this.mostrarMensajeExitoso = false;
      }, 3000); // Ocultar el mensaje después de 3 segundos
    }, err => console.log(err));
    this.cerrarPopup();
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
