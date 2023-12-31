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

  getProductsFromFakeStore(category: string): Observable<ProductV2[]> {
    const categoryUrl = category ? `/category/${category}` : '';
    return this.http.get<ProductV2[]>(`https://fakestoreapi.com/products${categoryUrl}?sort=desc`);
  }

  saveProduct(product: any, selectedProduct: ProductV2 | null) {
    if (!selectedProduct) return this.http.post('https://fakestoreapi.com/products', product);

    return this.http.put(`https://fakestoreapi.com/products/${selectedProduct.id}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`https://fakestoreapi.com/products/${productId}`)
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }
}
