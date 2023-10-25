import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { TableComponent } from './pages/table/table.component';
import { TableLazyComponent } from './pages/table-lazy/table-lazy.component';
import { TableCrudComponent } from './pages/table-crud/table-crud.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';

//* PrimeNG Modules
import { TableModule as TableNG } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    TableComponent,
    TableLazyComponent,
    TableCrudComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablesRoutingModule,
    //* PrimeNG Modules
    TableNG,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class TablesModule { }
