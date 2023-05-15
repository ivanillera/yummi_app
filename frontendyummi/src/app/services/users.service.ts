import { Injectable } from '@angular/core';
import {User} from '../../app/models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    URL_API = 'api/users/';

    constructor(private readonly http: HttpClient) { }

    getUsers(): Observable<Object> {
    	return this.http.get(this.URL_API);
    }

    getUser(id: string): Observable<User>{
    	return this.http.get<User>(this.URL_API + id);
    };


}
