import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private UsersService: UsersService) { }

  ngOnInit(): void {
  }

  perfil=true;
  apuntes=false;
  ponerApuntes(){
    this.apuntes=true;
    this.perfil=false;
  }
  ponerInfo(){
    this.apuntes=false;
    this.perfil=true;
  }
}
