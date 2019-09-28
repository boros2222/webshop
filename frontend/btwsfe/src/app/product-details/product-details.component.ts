import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from './../services/product.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let productId = params.get('productId');
      this.productService.getProduct(productId).subscribe(data => {
        this.product = data;
      })
    })
  }

}
