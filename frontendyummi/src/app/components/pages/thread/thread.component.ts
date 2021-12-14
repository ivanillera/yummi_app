import { Component, OnInit } from '@angular/core';
import { Apunte } from 'src/app/models/Apunte';
import { User } from 'src/app/models/User';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  listApuntes: Apunte[] = []
  tituloApunte = '';
  username: string = "juan";

  constructor(public noteService: NotesService) { }

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

}
