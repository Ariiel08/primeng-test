import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule as TableNG } from 'primeng/table';
import { TablesRoutingModule } from './tables-routing.module';
import { TableComponent } from './pages/table/table.component';
import { TableLazyComponent } from './pages/table-lazy/table-lazy.component';


@NgModule({
  declarations: [
    TableComponent,
    TableLazyComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    TableNG
  ]
})
export class TablesModule { }
