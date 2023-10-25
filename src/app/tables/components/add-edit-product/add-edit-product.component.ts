import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { TablesService } from '../../services/tables.service';

@Component({
  selector: 'add-edit-product-dialog',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  @Input()
  displayAddModal: boolean = true;

  @Output()
  closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  insertProduct: EventEmitter<any> = new EventEmitter<any>();

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: [0, Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  });

  constructor( private fb: FormBuilder, private tablesService: TablesService, private messageService: MessageService ) { }

  ngOnInit() {
    console.log(this.displayAddModal);
  }

  closeModal() {
    this.productForm.reset();
    this.closeDialog.emit(false);
  }

  addProduct() {
    this.tablesService.saveProduct(this.productForm.value)
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