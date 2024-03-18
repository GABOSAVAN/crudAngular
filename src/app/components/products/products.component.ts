import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/product';
import { MaterialModule } from '../../material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []; // Lista de productos obtenidos del localStorage
  showForm = false; // Bandera para mostrar/ocultar el formulario de actualización
  selectedProduct: Product | null = null; // Producto seleccionado para actualizar
  productsLocal: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadsProducts();
}

loadsProducts(){
  this.productsService.getProducts().subscribe(products => {
  this.products = products;
  this.productsService.saveLocalProducts()
  });
  this.productsLocal = this.productsService.getLocalProducts();
}

  // saveLocalProducts() {
  //   localStorage.setItem('products', JSON.stringify(this.products));
  // }
  
  showUpdateForm(product: Product) {
    this.showForm = true;
    this.selectedProduct = { ...product }; 
    console.log(this.showForm);
    // Copia el producto seleccionado para actualizarlo
  }

  deleteProduct(productToDelete: Product) {
    // Mostrar el cuadro de diálogo de confirmación
    const isConfirmed = window.confirm(`¿Está seguro de querer eliminar el producto "${productToDelete.title}"?`);

    // Verificar si el usuario confirmó la eliminación
    if (isConfirmed) {
        // Encuentra el índice del producto a eliminar en productsLocal
        const index = this.productsLocal.findIndex(product => product.id === productToDelete.id);

        // Verifica si se encontró el producto
        if (index !== -1) {
            // Elimina el producto del array productsLocal
            this.productsLocal.splice(index, 1);
            // Actualiza el localStorage con los productos actualizados
            localStorage.setItem('products', JSON.stringify(this.productsLocal));
            // Actualiza la lista de productos
            this.products = this.productsLocal;
            
        } else {
            alert('Product not found!');
        }
    } else {
        // Si el usuario cancela, no se realiza ninguna acción
        alert('Product deletion canceled!');
    }
}
}

