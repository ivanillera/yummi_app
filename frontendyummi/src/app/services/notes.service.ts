import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';
import { User } from '../models/User';
import { EMPTY, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from './comments.service';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  URL_API = 'http://localhost:4000/api/notes/';
  FILE_API = 'https://file.io';
  
  notes: Note[] = [];
  
  selectedNote: Note = {
    name: '',
    career:'',
    subject: '',
    creator: '',
    content: '',
    calification: 0,
    attached:'',
    category: [],
    comments: []
  }

  selectedComment: Comment = {
    creator: '',
    content: '',
    date: new Date()
  }
  
  constructor(private http: HttpClient, private toastr: ToastrService) {
  }
  
  getNotes() {
    return this.http.get<Note[]>(this.URL_API);
  }

  getNote(id: string): Observable<any> {
    return this.http.get(this.URL_API + id);
  }

  createNote(note:Note): Observable<any>{
    return this.http.post(this.URL_API, note);
  }

  commentNote(note:Note, id:string, comment: Comment):Observable<any> {
    let actualComments = note.comments
    const body = {
      // [Comments] = [Comments] + comment
      comments:  actualComments.concat(comment)
    }
    note.comments = actualComments.concat(comment)

    return this.http.put(this.URL_API + id, body);
  }

  // getCommentsOf(id:string):Observable<any>{
  //   console.log('getCommentsOf tira ', this.http.get<Comment[]>(this.URL_API + id))
  //   return this.http.get<Comment[]>(this.URL_API + id)
  // }


  agregarLike(note: Note, id: string): Observable<any> {
    const resCalification = note.calification
    const body = {calification: resCalification + 1}
    return this.http.put(this.URL_API + id, body);
  }

  removerLike(note: Note, id: string): Observable<any> {
    const resCalification = note.calification
    const body = {calification: resCalification - 1}
    return this.http.put(this.URL_API + id, body);
  }

  deleteNote(id: string): Observable<any>{
    return this.http.delete(this.URL_API + id)
  }

  // Returns an observable
  upload(file:any):Observable<any> {
    if (file.size > 50000000){
      this.toastr.error('El archivo que quiere subir es demasiado pesado');
      return throwError('El archivo que quiere subir es demasiado pesado');
    } else {
    // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
        
      // Make http post request over api
      // with formData as req
      return this.http.post(this.FILE_API, formData)
    }

  }
}
