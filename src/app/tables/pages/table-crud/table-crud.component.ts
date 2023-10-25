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
  displayAddModal = false;

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
    this.displayAddModal = true;
  }

  insertProductIntoTable(product: any) {
    this.products.unshift(product);
  }
}
