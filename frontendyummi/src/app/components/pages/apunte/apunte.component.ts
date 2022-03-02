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

  constructor(
    public commentService: CommentsService, 
    private activatedRoute: ActivatedRoute, 
    public notesService: NotesService,
    private authService: AuthService,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder:FormBuilder 
    ) {
      this.commentForm = this.formBuilder.group({
        commentCreator: [''],
        content: ['', Validators.required],
        date: ['']
      })
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.notesService.getNote(this.id).subscribe(
      res => {
        this.note = res;
        console.log('Nota: ', this.note);
        this.note.comments = this.note.comments.reverse();
        },
      err => {console.log(err);}
    );
    this.getUserData();
    console.log(this.id);
    if (this.tokenId !== null){
      this.liked = this.note.calification.includes(this.tokenId);
      console.log('liked: ', this.liked);
      (<HTMLInputElement> document.getElementById("buttonComment")).disabled = true;
    }

  }

  getComments() {
    this.commentService.getComments().subscribe(
      res => {
        this.commentService.comments = res;
      },
      err => console.error(err)
    )
  }

  likear(){
    if (this.tokenId == null) {
      this.toastr.error('Debes iniciar sesión para poder dar likes!', 'Error');
      this.router.navigate(['/apuntes']);
    } else {
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
          this.toastr.info('Si te interesa este apunte y quiere comentar y/o likear, registrate y podras hacerlo!','Info');
        });
  }

  unlockCommentButton(){
    if (this.commentForm.get('content')?.value == ""){
      (<HTMLInputElement> document.getElementById("buttonComment")).disabled = true;
    }else{
      (<HTMLInputElement> document.getElementById("buttonComment")).disabled = false;
    }
  }

  addComment(){
    if (this.tokenId == null) {
      this.toastr.error('Debes iniciar sesión para poder comentar!', 'Error');
      this.router.navigate(['/apuntes']);
    } else {
      const date = new Date();
      let textDate = date.toLocaleString('es-AR');
  
      const COMMENT: Comment = {
        commentCreator: this.userData.name,
        content: this.commentForm.get('content')?.value,
        date: textDate
      }

      this.notesService.commentNote(this.note, this.id, COMMENT).subscribe(
        res => {
          console.log(res);
          this.toastr.success('Comentario agregado!');
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  resetForm(){
    this.commentForm.reset()
  }

}
