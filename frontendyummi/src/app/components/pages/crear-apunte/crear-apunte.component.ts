import { Component, OnInit } from '@angular/core';

import { FormGroup, NgForm } from '@angular/forms';
import { Note } from 'src/app/models/Note';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-crear-apunte',
  templateUrl: './crear-apunte.component.html',
  styleUrls: ['./crear-apunte.component.css'],
  providers: [NotesService],
})
export class CrearApunteComponent implements OnInit {

	
 	constructor(public noteService: NotesService){
	}

  ngOnInit(): void {
  }
  
  addNote(form: NgForm){
    console.log(form.value);
    this.noteService.createNote(form.value).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  resetForm(form: NgForm) {
      form.reset();
  }


}
function caca(caca: any) {
  throw new Error('Function not implemented.');
}

