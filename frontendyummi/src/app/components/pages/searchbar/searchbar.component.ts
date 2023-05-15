import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

    constructor(public authService: AuthService, public toastr: ToastrService) {
    }

    ngOnInit(): void {
        if(localStorage.getItem('token') == null) {
            document.getElementById("welcomeModalButton")!.click();
        }
    }

    checkUser():void{
        if (this.authService.loggedIn() == false){
            this.toastr.error('Necesitas iniciar sesión para poder subir un apunte','Tuvimos un problema :(');
        }
    }
}
