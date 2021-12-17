import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotesService } from '../../../services/notes.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService} from '../../../services/users.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import {ToastrService} from 'ngx-toastr';
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
  userData: any;

  userName: string;
  subjectId: any;
	
 	constructor(
    private noteService: NotesService, 
    private formBuilder:FormBuilder, 
    private authService: AuthService, 
    private userService: UsersService,
    public subjectsService: SubjectsService,
    private toastr: ToastrService){
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
    this.getUserData();
  }

  getUserData(){
    this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    this.tokenId = this.tokenInfo._id;
    this.userData = this.userService.getUser()
        .subscribe(res => {
          this.userData = res
          this.userName = this.userData.name;
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
    this.subjectId = (<HTMLInputElement>document.getElementById('subjectId')).value;   
}

  addNote(){
    const NOTE: Note = {
      name: this.noteForm.get('name')?.value,
      career: this.noteForm.get('career')?.value,
      creator: this.tokenId,
      subject: this.subjectId,
      content: this.noteForm.get('content')?.value,
      calification: this.noteForm.get('calification')?.value,
      attached: this.noteForm.get('attached')?.value,
      category: this.noteForm.get('category')?.value,
      comments: this.noteForm.get('comments')?.value
    }

    this.noteService.createNote(NOTE).subscribe(
      res => {
        console.log(res)
        this.toastr.success('Apunte creado con exito.','Apunte registrado!');
      },
      err => {console.log(err);}
    )
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
