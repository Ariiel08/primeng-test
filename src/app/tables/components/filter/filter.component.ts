import { Component, EventEmitter, Output } from '@angular/core';
import { TablesService } from '../../services/tables.service';

@Component({
  selector: 'table-crud-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  selectedCategory: string = '';
  categories: string[] = [];

  @Output()
  categoryEmitter: EventEmitter<string> = new EventEmitter();

  constructor( private tablesService: TablesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.tablesService.getCategories().subscribe(
      categories => this.categories = categories
    )
  }

  onChangeCategory({value}: any) {
    this.categoryEmitter.emit(value);
  }
}
