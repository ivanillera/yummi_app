import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
    counter(): void {
        throw new Error('Method not implemented.');
    }

    constructor(private readonly authService: AuthService) { }

    intercept(req:HttpRequest<any>, next:HttpHandler): any {
        let tokenizeReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
        return next.handle(tokenizeReq);
    }

}
