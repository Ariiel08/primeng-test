import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { TableLazyComponent } from './pages/table-lazy/table-lazy.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'basic-table', component: TableComponent },
      { path: 'lazy-table', component: TableLazyComponent },
      { path: '**', redirectTo: 'lazy-table' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
