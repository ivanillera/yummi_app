import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';
import { User } from '../models/User';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  URL_API = 'http://localhost:4000/api/notes';

  notes: Note[] = [];

  selectedNote: Note = {
    name: '',
    career:'',
    subject: '',
    creator: '',
    content: '',
    calification: 0,
    attached:'',
    category: ''
  }
  
  constructor(private http: HttpClient) {
  }

  
  getNotes() {
    return this.http.get<Note[]>(this.URL_API);
  }

  createNote(note:Note) {
    return this.http.post(this.URL_API, note);
  }
}
