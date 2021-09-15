import { Component, OnInit } from '@angular/core';
import { Apunte } from 'src/app/models/Apunte';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  listApuntes: Apunte[] = []
  tituloApunte = '';

  constructor() { }

  ngOnInit(): void {
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
