import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotesService } from '../../../services/notes.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService} from '../../../services/users.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Note } from '../../../models/Note';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-crear-apunte',
  templateUrl: './crear-apunte.component.html',
  styleUrls: ['./crear-apunte.component.css'],
  providers: [NotesService],
})
export class CrearApunteComponent implements OnInit {
  noteForm: FormGroup;
  tokenInfo: any;
  tokenId: any;
  userName: string;
  pepe: any;
	
 	constructor(
    private noteService: NotesService, 
    private formBuilder:FormBuilder, 
    private authService: AuthService, 
    private userService: UsersService,
    public subjectsService: SubjectsService){
    this.noteForm = this.formBuilder.group({
      name: ['', Validators.required],
      career: ['', Validators.required],
      creator: [''],
      subject: ['', Validators.required],
      content: ['', Validators.required],
      calification: 0,
      attached: ['', Validators.required],
      category : ['', Validators.required],
      comments: [[]]

    })

    this.userName = '';

	}

  ngOnInit(){ 
    this.getSubjects();
    this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    this.tokenId = this.tokenInfo._id;
    this.pepe = this.userService.getUser()
        .subscribe(res => {
          //console.log(res);
          this.pepe = res
          console.log(this.pepe);
          this.userName = this.pepe.name;
          console.log(this.userName);
        },
        err => {
          console.log(err);
        });

  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe(
      res => {
        this.subjectsService.subjects = res;
      },
      err => console.error(err)
    )
  }

  typeSubject(){
    var inputValue = (<HTMLInputElement>document.getElementById('pepe')).value;
    console.log(inputValue);
    console.log(this.noteService.notes);
  }

  addNote(){

    const NOTE: Note = {
      name: this.noteForm.get('name')?.value,
      career: this.noteForm.get('career')?.value,
      creator: this.tokenId,
      subject: this.noteForm.get('subject')?.value,
      content: this.noteForm.get('content')?.value,
      calification: this.noteForm.get('calification')?.value,
      attached: this.noteForm.get('attached')?.value,
      category: this.noteForm.get('category')?.value,
      comments: this.noteForm.get('comments')?.value
    }
    console.log(NOTE);
    /*
    this.noteService.createNote(NOTE).subscribe(
      res => {console.log(res);},
      err => {console.log(err);}
    )*/
  }

  resetForm(form: NgForm) {
      form.reset();
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
