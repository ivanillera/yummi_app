import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../../../../services/notes.service';
import { UsersService} from '../../../../../services/users.service';
import { AuthService } from '../../../../../services/auth.service';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
    selector: 'app-misapuntes',
    templateUrl: './misapuntes.component.html',
    styleUrls: ['./misapuntes.component.css']
})
export class MisapuntesComponent implements OnInit {

    tokenInfo: any;
    tokenId: any;
    userData: any;
    p: number = 1;

    constructor(public noteService: NotesService, public userService: UsersService,  private readonly authService: AuthService, private readonly toastr: ToastrService, public location: Location) { }
    ngOnInit(): void {
    	this.getNotes();
    	this.getUserData();
    }

    back():void {
    	this.location.back(); // <-- go back to previous location on cancel
    }

    getToken():void{
    	this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    	this.tokenId = this.tokenInfo._id;
    	return this.tokenId;
    }

    getUserData():void{
    	try{
    		this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    		this.tokenId = this.tokenInfo._id;

    		this.userData = this.userService.getUser(this.tokenId)
    			.subscribe(res => {
    				this.userData = res;
    				//This.userName = this.userData.name;

    			},
    			err => {
    				console.log(err);
    			});
    	}catch(Error){
    		console.log('Usuario Invitado');
    	}

    }


    getNotes():void {
    	this.noteService.getNotes().subscribe(
    		res => {
    			this.noteService.notes = res;
    			this.noteService.notes = this.noteService.notes.reverse();
    		},
    		err => console.error(err)
    	);
    }

    deleteNote(id:string):void{
    	this.noteService.deleteNote(id).subscribe(
    		res => {
    			this.noteService.notes = res;
    			this.toastr.success('Apunte eliminado con exito!','Apunte eliminado');
    		},
    		err => console.error(err)
    	);
    }

    getNote(id: string):void {
    	this.noteService.getNote(id).subscribe(
    		res => {
    			this.noteService.notes = res;
    		}
    	);
    }


    // Falta implementación

    getDecodedAccessToken(token: string): any {
    	try{
    		return jwt_decode(token);
    	}
    	catch(Error){
    		return null;
    	}
    }

}

