import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from "./user/auth.guard";
import {ProductsResolver} from "./products/products-resolver.service";
import {LoginComponent} from "./user/login.component";
import {SelectiveStrategyService} from "./selective-strategy.service";

const ROUTES: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'products',
    canActivate: [AuthGuard],
    // canLoad: [AuthGuard],  // prevents preloading, duh
    // canMatch: [AuthGuard],
    runGuardsAndResolvers: "always",
    resolve: {resolvedData: ProductsResolver},
    data: {preload: false},
    loadChildren: () =>
      import('./products/product.module').then(m => m.ProductModule)
  },
  {path: '', redirectTo: 'welcome', pathMatch: "full"},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {enableTracing: false, preloadingStrategy: SelectiveStrategyService}),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
