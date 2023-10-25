import { Component } from '@angular/core';
import { ProductV2 } from '../../interfaces/product.interface';
import { TablesService } from '../../services/tables.service';

@Component({
  templateUrl: './table-crud.component.html',
  styles: [
  ]
})
export class TableCrudComponent {
  
  products: ProductV2[] = [];
  displayAddEditModal: boolean = false;
  selectedProduct: ProductV2 | null = null;

  constructor( private tablesService: TablesService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.tablesService.getProductsFromFakeStore()
      .subscribe(
        products => {
          this.products = products;
        }
      )
  }

  showAddModal(): void {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  insertProductIntoTable(newProduct: any): void {
    if (newProduct.id === this.selectedProduct?.id) {
      const productIndex = this.products.findIndex(data => data.id === newProduct.id);
      this.products[productIndex] = newProduct;

      return;
    }

    this.products.unshift(newProduct);
  }

  showEditModal(product: ProductV2): void {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }
}
