import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "";

  constructor(
    private http: HttpClient,
    private injector: Injector) {
      this.url = this.injector.get('baseurl') + '/product';
  }

  getProducts() {
    return this.http.get(this.url + '/list');
  }

  getProduct(id: string) {
    return this.http.get(this.url + `/${id}`);
  }
}
