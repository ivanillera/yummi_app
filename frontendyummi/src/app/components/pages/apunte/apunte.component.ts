import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { CommentsService } from '../../../services/comments.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../../../models/Note';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService} from '../../../services/users.service';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


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
    };

    SRC_FILE: any;
    sanitizer: any;

    constructor(
        public commentService: CommentsService,
        private readonly activatedRoute: ActivatedRoute,
        public notesService: NotesService,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        public toastr: ToastrService,
        public router: Router,
        private readonly formBuilder:FormBuilder
    ) {
    	this.commentForm = this.formBuilder.group({
    		commentCreator: [''],
    		content: ['', Validators.required],
    		date: ['']
    	});
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
    		(<HTMLInputElement>document.getElementById("buttonComment")).disabled = true;
    	}

    }

    getComments(): void {
    	this.commentService.getComments().subscribe(
    		res => {
    			this.commentService.comments = res;
    		},
    		err => console.error(err)
    	);
    }

    likear(): void{
    	if (this.tokenId == null) {
    		this.toastr.error('Debes iniciar sesión para poder dar likes!', 'Error');
    	} else {
    		if (this.note.calification.includes(this.tokenId)) {
    			console.log("Ya likeaste");
    			this.notesService.removerLike(this.note,this.id,this.tokenId).subscribe(
    				res => res,
    				err => console.log(err)
    			);
    			this.liked = false;
    			console.log("No likeo, pongo like en: ", this.liked);
    		}
    		else{
    			this.notesService.agregarLike(this.note,this.id,this.tokenId).subscribe(
    				res => res,
    				err => console.log(err)
    			);
    			this.liked = true;
    			console.log("Likeo, pongo like en: ", this.liked);
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

    unlockCommentButton(): void{
    	if (this.commentForm.get('content')?.value == ""){
    		((<HTMLInputElement>document.getElementById("buttonComment"))).disabled = true;
    	}else{
    		(<HTMLInputElement> document.getElementById("buttonComment")).disabled = false;
    	}
    }

    addComment(): void{
    	if (this.tokenId == null) {
    		this.toastr.error('Debes iniciar sesión para poder comentar!', 'Error');
    	} else {
    		const date = new Date();
    		let textDate = date.toLocaleString('es-AR');

    		const COMMENT: Comment = {
    			commentCreator: this.userData.name,
    			content: this.commentForm.get('content')?.value,
    			date: textDate
    		};

    		this.notesService.commentNote(this.note, this.id, COMMENT).subscribe(
    			res => {
    				console.log(res);
    				this.toastr.success('Comentario agregado!');
    			}
    		);
    	}
    }

    resetForm(): void{
    	this.commentForm.reset();
    }

    savePage(): void{
    	const pageHtml = document.documentElement.outerHTML;
    	const blob = new Blob([pageHtml], { type: 'text/html' });
    	const url = window.URL.createObjectURL(blob);
    	const link = document.createElement('a');
    	link.href = url;
    	link.download = 'apunte.html';
    	link.click();
    	window.URL.revokeObjectURL(url);
    }

}
