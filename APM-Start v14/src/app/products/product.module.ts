import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProductListComponent} from './product-list.component';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductSearchComponent} from './product-search/product-search.component';

import {SharedModule} from '../shared/shared.module';
import {ProductResolver} from './product-resolver.service';
import {ProductsResolver} from './products-resolver.service';
import {ProductEditInfoComponent} from "./product-edit/product-edit-info.component";
import {ProductEditTagsComponent} from "./product-edit/product-edit-tags.component";
import {AuthGuard} from "../user/auth.guard";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products',
        canActivate: [AuthGuard],
        resolve: {resolvedData: ProductsResolver},
        children: [
          {path: '', component: ProductListComponent},
          {path: 'search', component: ProductSearchComponent},
          {path: ':id', component: ProductDetailComponent, resolve: {resolvedData: ProductResolver}},
          {
            path: ':id/edit', component: ProductEditComponent, resolve: {resolvedData: ProductResolver},
            children: [
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full'
              },
              {
                path: 'info',
                component: ProductEditInfoComponent
              },
              {
                path: 'tags',
                component: ProductEditTagsComponent
              }
            ]
          }
        ]

      },

    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductSearchComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule {
}
