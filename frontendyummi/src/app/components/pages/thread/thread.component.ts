import { Component, OnInit } from '@angular/core';
import { Apunte } from 'src/app/models/Apunte';
import { User } from 'src/app/models/User';
import { NotesService } from '../../../services/notes.service';
import { UsersService} from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import jwt_decode from 'jwt-decode';

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
  tokenInfo: any;
  tokenId: any;
  userData: any;
  userName: any;

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


  // Falta implementación

  agregarApunte(){
    // Crear un objeto tarea
    const apunte: Apunte = {
      titulo : this.tituloApunte,
      creador : 'Creador',
      fecha : 'Fecha',
      materia : 'Materia',
      calificacion : 3,
    }
    // Agregar objeto tarea al array
    this.listApuntes.push(apunte);
    // Resetear formulario
    this.tituloApunte = ''
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
