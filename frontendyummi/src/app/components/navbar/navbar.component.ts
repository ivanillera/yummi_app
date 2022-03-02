import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = {
    mail: '',
    password: ''
  }

  constructor(public authService:AuthService, private router: Router, private toastr: ToastrService) { }
  
  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/perfil']);
          this.closeModal('#sesionModal');
        },
        err => {
          this.toastr.error('Usuario y/o contraseña invalidos', 'Tuvimos un problema :(');
          document.getElementById('mailInput')?.classList.add('is-invalid');
          document.getElementById('pwInput')?.classList.add('is-invalid');
          console.log(err);
        }
      ) 
  }

  closeModal(target: string){
    $(target).modal('hide');
  }
}
