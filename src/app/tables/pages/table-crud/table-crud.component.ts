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

  getProducts() {
    this.tablesService.getProductsFromFakeStore()
      .subscribe(
        products => {
          this.products = products;
        }
      )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  insertProductIntoTable(product: any) {
    this.products.unshift(product);
  }

  showEditModal(product: ProductV2) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }
}
