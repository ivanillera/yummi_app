import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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

  constructor(public authService:AuthService, private router: Router) { }
  
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
          console.log(err);
        }
      ) 
  }

  closeModal(target: string){
    $(target).modal('hide');
  }
}
