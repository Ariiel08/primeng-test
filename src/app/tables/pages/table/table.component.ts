import { Component } from '@angular/core';
import { TablesService } from '../../services/tables.service';

@Component({
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  public users = [];

  constructor( private tablesService: TablesService ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.tablesService.getUserList().subscribe(
      userList => this.users = userList
    );
  }
}
