import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/Comment';
import { Observable } from 'rxjs';

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
    };

    constructor(private readonly http: HttpClient) {
    }
    getComments(): Observable<Comment[]> {
    	return this.http.get<Comment[]>(this.URL_API);
    }
    createComment(comment:Comment): Observable<Object> {
    	return this.http.post(this.URL_API, comment);
    }
}
