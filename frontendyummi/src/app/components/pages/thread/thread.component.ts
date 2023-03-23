import { Component, OnInit } from '@angular/core';
import { Apunte } from 'src/app/models/Apunte';
import { User } from 'src/app/models/User';
import { NotesService } from '../../../services/notes.service';
import { UsersService} from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';
import {CareerFilterPipe} from '../../../pipes/career-filter.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  listApuntes: Apunte[] = []
  tituloApunte = '';
  username: string = '';
  filterPost='';
  filterCategory='';
  filterSubject='';
  filterCareer='';
  sortCalification: boolean = true;
  sortComment: boolean = true;
  calification: any;
  tokenInfo: any;
  tokenId: any;
  userData: any;
  userName: any;
  p: number = 1;

  constructor(public noteService: NotesService, public userService: UsersService,  private authService: AuthService, public location: Location) { }

  ngOnInit(): void {
    this.getNotes();
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getNotes() {
    this.noteService.getNotes().subscribe(
      res => {
        this.noteService.notes = res;
          this.noteService.notes = this.noteService.notes.reverse(); 
          console.log(res);
      },
      err => {console.error(err);
      }
    )
  }

  sortByCalification(){
    const filterCategory = (<HTMLInputElement>document.getElementById('filterCategory')).value;  
    console.log(filterCategory); 
    (<HTMLInputElement>document.getElementById('filterCategory')).value = "";
    console.log((<HTMLInputElement>document.getElementById('filterCategory')).value);
    if (this.sortCalification){
      this.noteService.notes.sort((note1,noteX) => note1.calification.length - noteX.calification.length);
      this.sortCalification = false;
    } else {
      this.noteService.notes.sort((note1,noteX) => note1.calification.length < noteX.calification.length ? 1 : -1);
      this.sortCalification = true;
    }

    (<HTMLInputElement>document.getElementById('filterCategory')).value = filterCategory;

  }

  sortByComments(){
    if (this.sortComment){
      this.noteService.notes.sort((note1,noteX) => note1.comments.length - noteX.comments.length);
      this.sortComment = false;
    } else {
      this.noteService.notes.sort((note1,noteX) => note1.comments.length < noteX.comments.length ? 1 : -1);
      this.sortComment = true;
    }
  }

  deleteNote(id:string){
    this.noteService.deleteNote(id).subscribe(
      res => {
        this.noteService.notes = res;
      },
      err => console.error(err)
    )
  }

  getUserData(){
    this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
    this.tokenId = this.tokenInfo._id;
    this.userData = this.userService.getUser(this.tokenId)
        .subscribe(res => {
          this.userData = res
          this.userName = this.userData.name;
        },
        err => {
          console.log(err);
        });
  }
  
  getNote(id: any) {
    this.noteService.getNote(id).subscribe(
      res => {
        this.noteService.notes = res
      }
    )
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
