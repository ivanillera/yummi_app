import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  URL_API = 'http://localhost:4000/api/notes'

  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get(this.URL_API);
  }

}
