import { Injectable } from '@angular/core';
import {User} from '../../app/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL_API = 'http://localhost:4000/api/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.URL_API);
  }

  getUser(){
    return this.http.get<User>('http://localhost:4000/api/users/61b288da99b1b433ea65ae3d');
  };


}
