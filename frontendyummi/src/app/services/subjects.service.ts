import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/Subject';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectsService {

    URL_API = 'api/subjects/';

    subjects: Subject[] = [];

    constructor(private readonly http: HttpClient) { }

    getSubjects(): Observable<Subject[]> {
    	return this.http.get<Subject[]>(this.URL_API);
    }

}
