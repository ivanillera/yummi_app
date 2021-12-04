import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-apunte',
  templateUrl: './apunte.component.html',
  styleUrls: ['./apunte.component.css']
})
export class ApunteComponent implements OnInit {
  listComments: Comment[] = []
  commentCreator = "Creador de Prueba"
  commentContent = ""
  commentDate = "21/10/2021"

  addComment(){
    // Crear un objeto comentario
    const comment: Comment = {
      content: this.commentContent,
      creator: this.commentCreator,
      date: this.commentDate
    }
    // Agregar objeto comentario al array
    this.listComments.push(comment);
    // Reset input
    this.commentContent = '';

  }
  

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  liked = false;
  status = '0'; 
  likear(){
    this.liked = !this.liked;
    this.status = this.liked ? '1' : '0';

  }

}
