import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { TablesService } from '../../services/tables.service';
import { ProductV2 } from '../../interfaces/product.interface';

@Component({
  selector: 'add-edit-product-dialog',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit, OnChanges {

  @Input()
  displayAddEditModal: boolean = true;

  @Input()
  selectedProduct: ProductV2 | null = null;

  @Output()
  closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  insertProduct: EventEmitter<any> = new EventEmitter<any>();

  modalType: string = '';

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: [0, Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  });

  constructor( private fb: FormBuilder, private tablesService: TablesService, private messageService: MessageService ) { }
  
  ngOnInit() {
    console.log(this.displayAddEditModal);
  }
  
  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'edit';
      this.productForm.patchValue(this.selectedProduct);
      return;
    }

    this.modalType = 'add';
    this.productForm.reset();
  }

  closeModal() {
    this.productForm.reset();
    this.closeDialog.emit(false);
  }

  addEditProduct() {
    this.tablesService.saveProduct(this.productForm.value, this.modalType)
      .pipe(
        catchError(error => {
          console.error("Ha ocurrido un error:", error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          return of();
        })
      )
      .subscribe( newProduct => {
        console.log(newProduct);
        this.insertProduct.emit(newProduct);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
      });
  }
}