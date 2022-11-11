import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductSearchComponent } from './product-search/product-search.component';

import { SharedModule } from '../shared/shared.module';
import { ProductResolver } from './product-resolver.service';
import { ProductsResolver } from './products-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, resolve: { resolvedData: ProductsResolver } },
      { path: 'products/search', component: ProductSearchComponent },
      { path: 'products/:id', component: ProductDetailComponent, resolve: { resolvedData: ProductResolver } },
      { path: 'products/:id/edit', component: ProductEditComponent, resolve: { resolvedData: ProductResolver } }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductSearchComponent
  ]
})
export class ProductModule { }
