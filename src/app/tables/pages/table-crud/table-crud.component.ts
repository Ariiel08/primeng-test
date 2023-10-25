import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductV2 } from '../../interfaces/product.interface';
import { TablesService } from '../../services/tables.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription, catchError, of } from 'rxjs';

@Component({
  templateUrl: './table-crud.component.html',
})
export class TableCrudComponent implements OnInit, OnDestroy {
  products: ProductV2[] = [];
  displayAddEditModal: boolean = false;
  selectedProduct: ProductV2 | null = null;
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();

  constructor(
    private tablesService: TablesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(): void {
    this.productSubscription = this.tablesService.getProductsFromFakeStore().subscribe((products) => {
      this.products = products;
    });
    this.subscriptions.push(this.productSubscription);
  }

  showAddModal(): void {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  insertProductIntoTable(newProduct: any): void {
    if (newProduct.id === this.selectedProduct?.id) {
      const productIndex = this.products.findIndex(
        (data) => data.id === newProduct.id
      );
      this.products[productIndex] = newProduct;

      return;
    }

    this.products.unshift(newProduct);
  }

  showEditModal(product: ProductV2): void {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  deleteProduct(product: ProductV2): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product ?',
      accept: () => {
        this.tablesService.deleteProduct(product.id)
        .pipe(
          catchError(error => {
            console.error("Ha ocurrido un error:", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
            return of();
          })
        )
        .subscribe(
          () => {
            this.products = this.products.filter(data => data.id !== product.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted succesfully' });
          }
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe() );
  }
}
