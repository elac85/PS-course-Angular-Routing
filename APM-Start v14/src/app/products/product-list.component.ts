import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductsResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilterByName(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        const resolvedData: ProductsResolved = data['resolvedData'];
        this.errorMessage = resolvedData.error!;

        this.products = resolvedData.product!;

        // check queryParams but only the filter input and showImage boolean

        // this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        // this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

        // check queryParams with advanced search params and filter input and showImage boolean

        if (this.route.snapshot.queryParamMap.keys.length > 0) {
          let urlParams = this.route.snapshot.queryParamMap;

          for (const param of urlParams.keys) {
            param === 'name' ? this.products = this.performFilterByName(urlParams.get('name')!) :
            param === 'code' ? this.products = this.performFilterByCode(urlParams.get('code')!) : 
            param === 'startDate' ? this.products = this.performFilterByStartDate(urlParams.get('startDate')!) : 
            param === 'endDate' ? this.products = this.performFilterByEndDate(urlParams.get('endDate')!) : 
            param === 'filterBy' ? this.products = this.performFilterByName(urlParams.get('filterBy')!) :
            param === 'showImage' ? this.showImage = urlParams.get('showImage')! === "true" : 
            0
          }
        }
        console.log(this.products);
        this.filteredProducts = this.performFilterByName(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilterByName(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilterByCode(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productCode.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilterByStartDate(startDate: string): Product[] {
    let startDatetoDate = new Date(startDate);
    return this.products.filter((product: Product) =>
      startDatetoDate < new Date(product.releaseDate))
  }

  performFilterByEndDate(endDate: string): Product[] {
    let endDatetoDate = new Date(endDate);
    return this.products.filter((product: Product) =>
      endDatetoDate > new Date(product.releaseDate))
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
