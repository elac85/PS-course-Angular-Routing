import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { ProductResolved } from "./product";
import { ProductService } from "./product.service";


@Injectable({
    providedIn: "root"
})

export class ProductResolver implements Resolve<ProductResolved>{

    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id = parseInt(route.paramMap.get('id') as string);
        if(isNaN(id)){
            const errMessage = `Product id: ${id} is not a number`
            console.log(errMessage);
            return of({product: null, error: errMessage});
        } 
        return this.productService.getProduct(id)
        .pipe(
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