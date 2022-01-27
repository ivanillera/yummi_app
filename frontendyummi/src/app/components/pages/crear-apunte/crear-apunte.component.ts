import { Component, ElementRef, OnInit } from '@angular/core';
import * as $ from "jquery";

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService} from '../../../services/users.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { FilesService } from 'src/app/services/files.service';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../../../models/Note';
import jwt_decode from 'jwt-decode';
import { FilestackService } from '@filestack/angular';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-crear-apunte',
  templateUrl: './crear-apunte.component.html',
  styleUrls: ['./crear-apunte.component.css'],
  providers: [NotesService]
})

export class CrearApunteComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  htmlContent: any;
  
  // Variable to store shortLink from api response
  shortLink: string = "";
  file: any; // Variable to store file
  loading: any;

  noteForm: FormGroup;
  tokenInfo: any;
  tokenId: any;
  userData: any;

  userName: string;
  subjectId: any;

  arrayPrueba:any;

 	constructor(
    private noteService: NotesService, 
    private formBuilder:FormBuilder, 
    private authService: AuthService, 
    private userService: UsersService,
    public subjectsService: SubjectsService,
    public fileService: FilesService,
    private toastr: ToastrService,
    private filestackService: FilestackService,
    private router: Router,
    ){
    this.noteForm = this.formBuilder.group({
      name: ['', Validators.required],
      career: ['', Validators.required],
      creator: [''],
      subject: ['', Validators.required],
      content: ['', Validators.required],
      calification: 0,
      attached: ['', Validators.required],
      category : [ [], Validators.required],
      comments: [[]]

    })
    this.userName = '';
    this.arrayPrueba = [];
	}

  ngOnInit(){
    // API KEY
    this.filestackService.init('AvHvKEsxS4i2EoPKAkTaez'); 
    this.getUserData()
    this.getSubjects()
  }

  fileChanged(e:any) {
    (<HTMLInputElement> document.getElementById("succesLabel")).style.display = "none";
    (<HTMLInputElement> document.getElementById("uploadButton")).disabled = false;
    this.file = e.target.files[0];
    console.log(this.file);
    if (this.file.size > 50000000){
      this.toastr.error('El archivo que estas intentando subir es mayor a 50 MB.');
      this.file = null;
      e.target.value = null;
    }
  }

  uploadFile(){
    this.postFileStack().then((res) => {
      this.loading!.style.display = "none";
      this.toastr.success('Archivo cargado con exito.');
      (<HTMLInputElement> document.getElementById("succesLabel")).style.display = "block";
    })
  }

  postFileStack(){
    (<HTMLInputElement> document.getElementById("uploadButton")).disabled = true;
    this.loading = document.getElementById('fileLoading');
    this.loading!.style.display = "block";
    return new Promise((resolve, reject) => {
      this.filestackService.upload(this.file)
      .subscribe(res => {
        console.log(Object.keys(res));
        console.log(Object.values(res)[4]);
        this.shortLink = Object.values(res)[4]; //el valor del attached
        resolve(res);
      })
    })
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
      subject: this.noteForm.get('subject')?.value,
      content: this.noteForm.get('content')?.value,
      calification: this.noteForm.get('calification')?.value,
      attached: this.shortLink,
      //category: this.noteForm.get('category')?.value,
      category: this.noteForm.get('category')?.value,
      comments: []
      // comments: this.noteForm.get('comments')?.value
    }
    console.log(NOTE);
    this.noteService.createNote(NOTE).subscribe(
      res => {
        console.log(res)
        this.toastr.success('Apunte creado con exito.','Apunte registrado!');
        this.router.navigate(['/']);
      },
      err => {console.log(err);}
    );
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
