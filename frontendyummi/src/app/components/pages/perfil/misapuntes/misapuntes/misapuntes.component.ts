import { Component, OnInit } from '@angular/core';
import { Apunte } from 'src/app/models/Apunte';
import { User } from 'src/app/models/User';
import { NotesService } from '../../../../../services/notes.service';
import { UsersService} from '../../../../../services/users.service';
import { AuthService } from '../../../../../services/auth.service';
import jwt_decode from 'jwt-decode';
import { ThreadComponent } from '../../../thread/thread.component';

@Component({
  selector: 'app-misapuntes',
  templateUrl: './misapuntes.component.html',
  styleUrls: ['./misapuntes.component.css']
})
export class MisapuntesComponent implements OnInit {



  constructor(public noteService: NotesService, public userService: UsersService,  private authService: AuthService, ) { }
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes().subscribe(
      res => {
        this.noteService.notes = res;
      },
      err => console.error(err)
    )
  }

  deleteNote(id:string){
    this.noteService.deleteNote(id).subscribe(
      res => {
        this.noteService.notes = res;
      },
      err => console.error(err)
    )
  }
  
  getNote(id: any) {
    this.noteService.getNote(id).subscribe(
      res => {
        this.noteService.notes = res
      }
    )
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

