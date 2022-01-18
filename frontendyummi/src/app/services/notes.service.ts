import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/Note';
import { User } from '../models/User';
import { EMPTY, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  // addLike(note:Note): Observable<any>{
  //   return this.http.put(this.URL_API, note.calification = note.calification +  1)
  // }

  // this.notesService.getNote(this.id).subscribe(
  //   res => {
  //     this.note = res;
  //     console.log('Nota: ', this.note);
  //     },
  //   err => {console.log(err);}
  // );


  
  updateNote(note: Note, id: string): Observable<any> {
    const resCalification = note.calification
    const body = {calification: resCalification + 1}
    return this.http.put(this.URL_API + id, body);
  }

  // updateNote(id: string, note: Note): Observable<any> {
  //   const calificacionActual = this.getCalification(id,note)
  //   console.log("calification: ", calificacionActual)
  //   const body = { calification: calificacionActual }
  //   return this.http.put(this.URL_API + id, body);
  // }

  // getCalification(id:string, note:Note){
  //   return this.http.post(this.URL_API + id, note.calification )
  // }

  // updateNote(id:string, x:number): Observable<any> {
  //   let body = { calification: x }
  //   return this.http.put(this.URL_API, body);
  // }

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
