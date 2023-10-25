import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { TableLazyComponent } from './pages/table-lazy/table-lazy.component';
import { TableCrudComponent } from './pages/table-crud/table-crud.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'basic-table', component: TableComponent },
      { path: 'lazy-table', component: TableLazyComponent },
      { path: 'crud-table', component: TableCrudComponent },
      { path: '**', redirectTo: 'crud-table' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
