import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse, ProductV2 } from '../interfaces/product.interface';

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

  getProductsFromFakeStore(): Observable<ProductV2[]> {
    return this.http.get<ProductV2[]>('https://fakestoreapi.com/products?sort=desc');
  }

  saveProduct(product: any, selectedProduct: ProductV2 | null) {
    if (!selectedProduct) return this.http.post('https://fakestoreapi.com/products', product);

    return this.http.put(`https://fakestoreapi.com/products/${selectedProduct.id}`, product);
  }
}
