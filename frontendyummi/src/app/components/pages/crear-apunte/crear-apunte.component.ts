import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService} from '../../../services/users.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { FilesService } from 'src/app/services/files.service';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../../../models/Note';
// eslint-disable-next-line camelcase
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
        public noteService: NotesService,
        private readonly formBuilder:FormBuilder,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        public subjectsService: SubjectsService,
        public fileService: FilesService,
        public toastr: ToastrService,
        public filestackService: FilestackService,
        private readonly router: Router,
    ){
    	this.noteForm = this.formBuilder.group({
    		name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(75)]],
    		career: ['', Validators.required],
    		creator: [''],
    		subject: ['', Validators.required],
    		content: [''],
    		attached: [''],
    		category : [ [], Validators.required],
    	});
    	this.userName = '';
    	this.arrayPrueba = [];
    }

    ngOnInit(): void{
    // API KEY
    	this.filestackService.init('AvHvKEsxS4i2EoPKAkTaez');
    	this.getUserData();
    	this.getSubjects();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    fileChanged(e: any): void {
    	if(<HTMLInputElement> document.getElementById("succesLabel")){
    		(<HTMLInputElement> document.getElementById("succesLabel")).style.display = "none";
    	}
    	this.file = (e.target as HTMLInputElement | null)?.files?.[0];
    	console.log(this.file);
    	if (this.file.size > 50000000){
    		this.toastr.error('El archivo que estas intentando subir es mayor a 50 MB.');
    		this.file = null;
    		(e.target as HTMLInputElement).value = "";

    	} else {
    		this.postFileStack().then((res) => {
    			expect(res).toBeDefined();
    			this.loading = document.getElementById('fileLoading');
    			if(this.loading){
                    this.loading!.style.display = "none";
    			}
    			this.toastr.success('Archivo cargado con exito.');
    			(<HTMLInputElement> document.getElementById("succesLabel")).style.display = "block";
    		});
    	}
    }

    postFileStack(): Promise<unknown>{
    	this.loading = document.getElementById('fileLoading');
    	if(this.loading){
            this.loading!.style.display = "block";
    	}
    	return new Promise((resolve) => {
    		this.filestackService.upload(this.file)
    			.subscribe(res => {
    				console.log(Object.keys(res));
    				console.log(Object.values(res)[4]);
    				this.shortLink = Object.values(res)[4];
    				resolve(res);
    			});
    	});
    }

    getUserData(): void{
    	try{
    		this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    		this.tokenId = this.tokenInfo._id;

    		this.userData = this.userService.getUser(this.tokenId)
    			.subscribe(res => {
    				this.userData = res;

    			},
    			err => {
    				console.log(err);
    				this.toastr.info('Si te interesa este apunte y quiere comentar y/o likear, registrate y podras hacerlo!','Info');
    			});
    	}catch(Error){
    		console.log('Usuario Invitado');
    	}

    }

    getSubjects(): void {
    	this.subjectsService.getSubjects().subscribe(
    		res => {
    			this.subjectsService.subjects = res;
    		},
    		err => console.error(err)
    	);
    }

    typeSubject(): void{
    	this.subjectId = (<HTMLInputElement>document.getElementById('subjectId')).value;
    }

    checkValidator(name:string):void{
    	if (this.noteForm.get(name)?.valid){

    		document.getElementById(name)?.classList.remove('is-invalid');
    		document.getElementById(name)?.classList.add('is-valid');
    	}else{

    		document.getElementById(name)?.classList.remove('is-valid');
    		document.getElementById(name)?.classList.add('is-invalid');
    	}
    }

    addNote():void{
    	var alert = false;
    	const NOTE: Note = {
    		name: this.noteForm.get('name')?.value,
    		career: this.noteForm.get('career')?.value,
    		creator: this.tokenId,
    		subject: this.noteForm.get('subject')?.value,
    		content: this.noteForm.get('content')?.value,
    		calification: this.noteForm.get('calification')?.value,
    		attached: this.shortLink,
    		category: this.noteForm.get('category')?.value,
    		comments: this.noteForm.get('comments')?.value
    	};
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
    			this.noteService.createNote(NOTE).subscribe(
    				res => {
    					console.log(res);
    					this.toastr.success('Apunte creado con exito.','Apunte registrado!');
    					this.router.navigate(['/']);
    				},
    				err => {console.log(err);}
    			);
    		}
    	}
    }

    resetForm(form: NgForm):void {
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
