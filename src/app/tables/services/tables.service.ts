import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor( private http: HttpClient ) { }

  getUserList() {
    return this.http.get<any>('assets/users-list.json');
  }

  getProductsList( skip: number ): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  }
}
