import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router} from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    mail: '',
    password: '',
    legajo: ''
  }

  users: any;
  legajos: string[] = [];
  mails: string[] = [];


  constructor(private authService: AuthService, private router: Router, private userService: UsersService, private toastr: ToastrService) { }

  async ngOnInit(){

    await this.getLegajos()

    this.users.forEach((u: any) => {
      this.legajos.push(u.legajo);
      this.mails.push(u.mail);
    });
  }

  getLegajos(){
    var u:any;
    return new Promise((resolve) => {
      this.userService.getUsers()
      .subscribe(
        results => {
          this.users = results;
          resolve(results);
        }, 
        err => {}
      );
    })
  }

  checkValidator(name:string){

  }

  signUp(){
    var validator = true;

    this.legajos.forEach(legajo => {
      if (legajo == this.user.legajo){
        this.toastr.error('Este legajo ya se encuentra registrado', 'Tuvimos un problema :(');
        document.getElementById('legajo')?.classList.add('is-invalid');
        validator = false;
      }
    })

    this.mails.forEach(mail => {
      if (mail == this.user.mail){
        this.toastr.error('Este correo electrónico ya se encuentra registrado', 'Tuvimos un problema :(');
        document.getElementById('email')?.classList.add('is-invalid');
        validator = false;
      }
    })
    if (validator){
      this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/perfil']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
