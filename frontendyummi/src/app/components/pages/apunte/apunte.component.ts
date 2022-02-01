import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { CommentsService } from '../../../services/comments.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../../../models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService} from '../../../services/users.service';
import jwt_decode from 'jwt-decode';
import * as $ from "jquery";
import { FormBuilder, Validators } from '@angular/forms';
import { SubjectsService } from 'src/app/services/subjects.service';
import { FilesService } from 'src/app/services/files.service';
import {ToastrService} from 'ngx-toastr';
import { FilestackService } from '@filestack/angular';



@Component({
  selector: 'app-apunte',
  templateUrl: './apunte.component.html',
  styleUrls: ['./apunte.component.css']
})
export class ApunteComponent implements OnInit {

  // Info del user:
  tokenId: any;
  tokenInfo: any;
  userData: any;
  userName: any;
  liked: any;
  
  commentForm: FormGroup;

  attachedURL:any;
  strippedHTML: any;
  id: any;

  note: Note = {
    name: '',
    career:'',
    subject: '',
    creator: '',
    content: '',
    calification: [],
    attached:'',
    category: [],
    comments: []
  }

  SRC_FILE: any;
  sanitizer: any;

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
  constructor(
    public commentService: CommentsService, 
    private activatedRoute: ActivatedRoute, 
    public notesService: NotesService,
    private authService: AuthService,
    private userService: UsersService,
    private formBuilder:FormBuilder 
    ) {
      this.commentForm = this.formBuilder.group({
        creator: ['', Validators.required],
        content: ['', Validators.required],
        date: ['']
      })
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    //this.loadImages()
    this.getUserData()
    console.log(this.id);
    this.notesService.getNote(this.id).subscribe(
      res => {
        this.note = res;
        console.log('Nota: ', this.note);
        },
      err => {console.log(err);}
    );
    this.liked = this.note.calification.includes(this.tokenId)
    console.log('liked: ', this.liked)
  }



  async loadImages(){
    const response = await fetch('http://localhost:4000/api/files/61c0ebe8f9d18012531e62db').then(response => response.json());
    this.SRC_FILE = response.filePath;
    console.log(this.SRC_FILE);
    const fileElement = document.querySelector('.uopa');
    fileElement!.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'http://localhost:4000/api/files/61c0ebe8f9d18012531e62db/81f8d5aa-b390-4b4f-b375-5598348eb72a.png';
    img.height = 200;
    fileElement!.appendChild(img);
  };

  getComments() {
    this.commentService.getComments().subscribe(
      res => {
        this.commentService.comments = res;
      },
      err => console.error(err)
    )
  }



  likear(){
    if (this.note.calification.includes(this.tokenId)) {
      console.log("Ya likeaste")
      this.notesService.removerLike(this.note,this.id,this.tokenId).subscribe(
        res => res,
        err => console.log(err)
      )
      this.liked = false
      console.log("No likeo, pongo like en: ", this.liked)
    }
    else{
      this.notesService.agregarLike(this.note,this.id,this.tokenId).subscribe(
        res => res,
        err => console.log(err)
      )
      this.liked = true
      console.log("Likeo, pongo like en: ", this.liked)
    }
    this.notesService.getNote(this.id).subscribe(
      res => {
        this.note = res;
        console.log('Nota: ', this.note);
        },
      err => {console.log(err);}
    );
    
  }
  
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  getUserData(){
    this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    this.tokenId = this.tokenInfo._id;
    this.userData = this.userService.getUser(this.tokenId)
        .subscribe(res => {
          this.userData = res
          //this.userName = this.userData.name;

        },
        err => {
          console.log(err);
        });
  }

  addComment(){
    const COMMENT: Comment = {
      creator: this.tokenId,
      content: this.commentForm.get('content')?.value,
      date: new Date()
    }
    console.log(COMMENT);
    this.notesService.commentNote(this.note, this.id, COMMENT).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  resetForm(){
    this.commentForm.reset()
  }

  // addCommentNUEVO(form:NgForm){
  //   console.log("Form value da: ",form.value);
  //   this.notesService.commentNote(this.note,this.id,form.value).subscribe(
  //     res => console.log(res),
  //     err => console.log(err)
  //     );
  //     this.resetForm(form);
  //     this.getComments();

  // }

  // addComment(form: NgForm){
  //   console.log(form.value);
  //   this.commentService.createComment(form.value).subscribe(
  //     res => console.log(res),
  //     err => console.log(err)
  //   );
  //   this.getComments();
  //   this.resetForm(form);
  // }

}
