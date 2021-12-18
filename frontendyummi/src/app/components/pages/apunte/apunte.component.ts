import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { CommentsService } from '../../../services/comments.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../../../models/Note';

@Component({
  selector: 'app-apunte',
  templateUrl: './apunte.component.html',
  styleUrls: ['./apunte.component.css']
})
export class ApunteComponent implements OnInit {

  id: any;
  note: Note = {
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

  listComments: Comment[] = []
  commentCreator = "Creador de Prueba"
  commentContent = ""
  commentDate = "21/10/2021"

  // addComment(){
  //   // Crear un objeto comentario
  //   const comment: Comment = {
  //     content: this.commentContent,
  //     creator: this.commentCreator,
  //     date: this.commentDate
  //   }
  //   // Agregar objeto comentario al array
  //   this.listComments.push(comment);
  //   // Reset input
  //   this.commentContent = '';

  // }
  constructor(public commentService: CommentsService, private activatedRoute: ActivatedRoute, private notesService: NotesService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.id);
    this.notesService.getNote(this.id).subscribe(
      res => {
        this.note = res;
        console.log(this.note);
        },
      err => {console.log(err);}
    );
  }

  getComments() {
    this.commentService.getComments().subscribe(
      res => {
        this.commentService.comments = res;
      },
      err => console.error(err)
    )
  }


  liked = false;
  status = '0'; 
  likear(){
    this.liked = !this.liked;
    this.status = this.liked ? '1' : '0';

  }

  addComment(form: NgForm){
    console.log(form.value);
    this.commentService.createComment(form.value).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    this.getComments();
    this.resetForm(form);
  }

  resetForm(form: NgForm){ // No se usa.
    form.reset();
  }

}
