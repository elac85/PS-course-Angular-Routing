import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {catchError, delay, map, Observable, of, take} from "rxjs";
import {ProductsResolved} from "./product";
import {ProductService} from "./product.service";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: "root"
})

export class ProductsResolver implements Resolve<ProductsResolved> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductsResolved> {

    return this.productService.getProducts()
      .pipe(
        take(1),
        delay(1000),
        tap(data => console.log(data)),
        map(product => {
          return {product: product, error: ''}
        }),
        catchError(error => {
          const errMessage = `Retrieval error: ${error}`
          console.log(error.message);
          return of({product: null, error: errMessage})
        })
      )
  }
}
