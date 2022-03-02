import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/Subject';
import { User } from '../models/User';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  URL_API = 'api/subjects/';

  subjects: Subject[] = [];

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get<Subject[]>(this.URL_API);
  }

}
