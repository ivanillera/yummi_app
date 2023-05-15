import { Component, ElementRef, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesService } from '../../../../../services/notes.service';
import { AuthService } from '../../../../../services/auth.service';
import { UsersService} from '../../../../../services/users.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { FilesService } from 'src/app/services/files.service';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../../../../../models/Note';
import jwt_decode from 'jwt-decode';
import { FilestackService } from '@filestack/angular';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-editar-apunte',
  templateUrl: './editar-apunte.component.html',
  styleUrls: ['./editar-apunte.component.css'],
  providers: [NotesService]
})

export class EditarApunteComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Ingresa texto aquí...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['insertImage'],
      ['insertVideo'],
      
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
  enableUpload: boolean = false;
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

  id: any;
  arrayPrueba:any;

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
  notesService: any;

 	constructor(
    public noteService: NotesService, 
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder, 
    private authService: AuthService, 
    public userService: UsersService,
    public subjectsService: SubjectsService,
    public fileService: FilesService,
    public toastr: ToastrService,
    public filestackService: FilestackService,
    private router: Router,
    ){
    this.noteForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(75)]],
      career: ['', Validators.required],
      creator: [''],
      subject: ['', Validators.required],
      content: [''],
      // calification: [],
      attached: [''],
      category : [ [], Validators.required],
      // comments: [[]]
    })
    this.userName = '';
    this.arrayPrueba = [];
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
	}

  ngOnInit(){
    
    // API KEY
    this.filestackService.init('AvHvKEsxS4i2EoPKAkTaez'); 
    this.getUserData();
    this.noteService.getNote(this.id).subscribe(
      res => {
        this.note = res;
        this.htmlContent = this.note.content;
        this.shortLink = this.note.attached;
        console.log('Nota: ', this.note);
        },
      err => {console.log(err);}
    );

  }
  
  enableUp(){
    this.enableUpload = !this.enableUpload;
  }

  fileChanged(e:any) {
    if(<HTMLInputElement> document.getElementById("succesLabel")){
      (<HTMLInputElement> document.getElementById("succesLabel")).style.display = "none";
    }
    this.file = e.target.files[0];
    console.log(this.file);
    if (this.file.size > 50000000){
      this.toastr.error('El archivo que estas intentando subir es mayor a 50 MB.');
      this.file = null;
      e.target.value = null;
    }else{
      this.postFileStack().then((res) => {
        this.loading = document.getElementById('fileLoading');
        if(this.loading){
          this.loading!.style.display = "none";
        }
        this.toastr.success('Archivo cargado con exito.');
        if(<HTMLInputElement> document.getElementById("succesLabel")){
          (<HTMLInputElement> document.getElementById("succesLabel")).style.display = "block";
        }
        
      })
    }
  }

  postFileStack(){
    this.loading = document.getElementById('fileLoading');
    if (this.loading){
      this.loading!.style.display = "block";
    }
    return new Promise((resolve, reject) => {
      this.filestackService.upload(this.file)
      .subscribe(res => {
        console.log(Object.keys(res));
        console.log(Object.values(res)[4]);
        this.shortLink = Object.values(res)[4]; //el valor del attached
        this.note.attached = this.shortLink;
        resolve(res);
      })
    })
  }

  deleteFileStack(){
    //API Credentials for remove 
    var n = this.note.attached.lastIndexOf('/');
    var fileID = this.note.attached.substring(n + 1);
    console.log(fileID);
    this.note.attached = "";
    const security = {
      policy: 'eyJleHBpcnkiOjI1MjQ2MTg4MDAsImNhbGwiOlsicmVtb3ZlIl19',
      signature: '9e12ae5641139d030554b709b1697f263778d4c01204dc086b77c0a50a1e813e'
    };
    this.filestackService.remove(fileID, security)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Archivo eliminado con exito.');
        }, 
        err => {
          console.log(err);
          this.toastr.error('Archivo no encontrado.')
        }
      );
    this.enableUp();
  }

  getUserData(){
    try{
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
    }catch(Error){
      console.log('Usuario Invitado');
    }

  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe(
      res => {
        this.subjectsService.subjects = res;
      },
      err => console.error(err)
    )
  }

  // typeSubject(){
  //   this.subjectId = (<HTMLInputElement>document.getElementById('subjectId')).value;   
  // }

  CheckValidator(name:string){
    if (this.noteForm.get(name)?.valid){

      document.getElementById(name)?.classList.remove('is-invalid')
      document.getElementById(name)?.classList.add('is-valid');
    }else{

      document.getElementById(name)?.classList.remove('is-valid');
      document.getElementById(name)?.classList.add('is-invalid');
    }
  }

  updateNote(){
    var alert = false;
    this.noteForm.get('name')?.setValue((<HTMLInputElement>document.getElementById('name')).value)
    this.noteForm.get('career')?.setValue((<HTMLInputElement>document.getElementById('career')).value)
    this.noteForm.get('subject')?.setValue((<HTMLInputElement>document.getElementById('subject')).value)
    this.noteForm.get('category')?.setValue((<HTMLInputElement>document.getElementById('category')).value)

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
      comments: this.noteForm.get('comments')?.value
    }
    console.log(NOTE);

    Object.keys(this.noteForm.controls).forEach(key => {

      if (this.noteForm.get(key)?.valid){
        console.log(key + ' valid');
        document.getElementById(key)?.classList.add('is-valid');
      }else{
        console.log(key + ' invalid');
        document.getElementById(key)?.classList.add('is-invalid');
        alert = true;
      }
    });
    if (alert) {
      this.toastr.error('Algunos campos son incorrectos, por favor, corrigalos e intente nuevamente.', 'Tuvimos un problema :(', { timeOut: 13000 });
    } else
    {
      if (NOTE.content == "" && NOTE.attached == ""){
        this.toastr.warning('No ha agregado contenido ni archivo adjunto, agregá alguna información a tu apunte y vuelve a intentar!', 'Tuvimos un problema :(', { timeOut: 19000 });
      }else{
        this.noteService.updateNote(NOTE, this.id).subscribe(
          res => {
            console.log(res)
            this.toastr.success('Apunte actualizado con exito.','Apunte actualizado!');
            this.router.navigate(['/']);
          },
          err => {console.log(err);}
        );
      }
    }
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

