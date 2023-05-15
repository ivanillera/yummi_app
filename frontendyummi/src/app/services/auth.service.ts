import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface yummiUser {
    name: string;
    mail: string;
    password: string;
    legajo: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly URL = 'api/users';


    user = {
    	mail: '',
    	password: ''
    };
    constructor(public http: HttpClient, public router: Router) {  }

    signUp(user: yummiUser): Observable<any> {
    	return this.http.post<any>(this.URL + '/signup', user);
    }

    signIn(user: unknown): Observable<any>{
    	return this.http.post<any>(this.URL + '/signin', user);
    }

    loggedIn(): boolean {
    	return !!localStorage.getItem('token');
    }

    getToken(): string | null{
    	return localStorage.getItem('token');
    }

    logOut():void{
    	localStorage.removeItem('token');
    	this.router.navigate(['']);
    }

}
