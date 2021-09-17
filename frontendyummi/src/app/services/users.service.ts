import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL_API = 'http://localhost:4000/api/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.URL_API);
  }

}
