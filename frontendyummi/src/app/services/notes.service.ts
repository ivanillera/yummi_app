import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';
import { User } from '../models/User';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  URL_API = 'http://localhost:4000/api/notes/';

  notes: Note[] = [];

  selectedNote: Note = {
    name: '',
    career:'',
    subject: {
      name: '',
      professor: ''
    },
    creator: '',
    content: '',
    calification: 0,
    attached:'',
    category: '',
    comments: []
  }
  
  constructor(private http: HttpClient) {
  }
  
  getNotes() {
    return this.http.get<Note[]>(this.URL_API);
  }

  getNote(id: string): Observable<any> {
    return this.http.get(this.URL_API + id)
  }

  createNote(note:Note): Observable<any>{
    return this.http.post(this.URL_API, note);
  }
}
