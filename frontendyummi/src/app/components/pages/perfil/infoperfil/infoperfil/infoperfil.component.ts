import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { AuthService } from '../../../../../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-infoperfil',
  templateUrl: './infoperfil.component.html',
  styleUrls: ['./infoperfil.component.css']
})
export class InfoperfilComponent implements OnInit {

  tokenInfo: any;
  tokenId: any;
  userData: any;

  constructor(public userService: UsersService,  private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData();
    // this.userService.getUser(this.tokenId)
  }

  getUserData(){
    try{
      this.tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.authService.getToken()));
      this.tokenId = this.tokenInfo._id;
  
      this.userData = this.userService.getUser(this.tokenId)
          .subscribe(res => {
            this.userData = res  
          },
          err => {
            console.log(err);
          });
    }catch(Error){
      console.log('Usuario Invitado');
    } 

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
