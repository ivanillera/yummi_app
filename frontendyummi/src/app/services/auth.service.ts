import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'api/users';
  constructor(private http: HttpClient, private router: Router) {  }
  
  signUp(user: any){
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user: any){
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
