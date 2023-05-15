import { Component } from '@angular/core';
import {UsersService} from '../../../services/users.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  {

    constructor(private readonly UsersService: UsersService) { }

    perfil=true;
    apuntes=false;
    ponerApuntes():void{
    	this.apuntes=true;
    	this.perfil=false;
    }
    ponerInfo():void{
    	this.apuntes=false;
    	this.perfil=true;
    }
}
