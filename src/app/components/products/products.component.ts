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
  

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.loadsProducts();
    this.products = this.productsService.getLocalProducts();
}
  
  showUpdateForm(product: Product) {
    this.productsService.showUpdateForm(product);
  }

  deleteProduct(productToDelete: Product) {
    this.productsService.deleteProduct(productToDelete);
    this.products = this.productsService.getLocalProducts();
}
}

