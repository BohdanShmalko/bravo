import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoadingService} from "@core/services/loading/loading.service";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor{

  constructor(public loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.isLoading$.next(true);

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.isLoading$.next(false)
      })
    );
  }

}
