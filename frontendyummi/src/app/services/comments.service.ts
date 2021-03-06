import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/Comment';
import { Note } from '../models/Note';
import { User } from '../models/User';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  URL_API = 'api/comments/';

  comments: Comment[] = [];

  selectedComment: Comment = {
    commentCreator: '',
    content: '',
    date: '',
  }
  
  constructor(private http: HttpClient) {
  }

  
  getComments() {
    return this.http.get<Comment[]>(this.URL_API);
  }

  createComment(comment:Comment) {
    return this.http.post(this.URL_API, comment);
  }
}
