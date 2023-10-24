import { Component } from '@angular/core';
import { Product, ProductResponse } from '../../interfaces/product.interface';
import { TablesService } from '../../services/tables.service';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  templateUrl: './table-lazy.component.html',
  styles: [
  ]
})
export class TableLazyComponent {

  products: Product[] = [];
  totalRecords: number = 0;

  constructor( private tablesService: TablesService ) { }

  //* Al utilizar la let- en ng-template no se necesita
  // ngOnInit() {
  //   this.loadProducts();
  // }

  loadProducts($event: TableLazyLoadEvent) {
    console.log($event);
    this.tablesService.getProductsList($event.first || 0).subscribe(
      ( response: ProductResponse ) => {
        this.products = response.products;
        this.totalRecords = response.total;
      }
    )
  }
}
