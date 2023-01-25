import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  pageTitle = 'Product Search';
  searchProductParams: any = {
    name: null,
    code: null,
    startDate: null,
    endDate: null
  };

  searchProduct(){
    let optionalParams: any = Object.keys(this.searchProductParams)
    .filter((k) => this.searchProductParams[k] != null)
    .reduce((a, k) => ({ ...a, [k]: this.searchProductParams[k] }), {});

    this.router.navigate(['/products'], {queryParams: optionalParams})
  }

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

}
