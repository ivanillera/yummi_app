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
    };

    users: any;
    legajos: string[] = [];
    mails: string[] = [];
    validator = true;

    constructor(public authService: AuthService, public router: Router, public userService: UsersService, private readonly toastr: ToastrService) { }

    async ngOnInit(): Promise<void>{

    	await this.getLegajos();

    	this.users.forEach((u: any) => {
    		this.legajos.push(u.legajo);
    		this.mails.push(u.mail);
    	});
    }

    getLegajos(): Promise<unknown>{
    	return new Promise((resolve) => {
    		this.userService.getUsers()
    			.subscribe(
    				results => {
    					this.users = results;
    					resolve(results);
    				}
    			);
    	});
    }

    signUp():void{

    	this.legajos.forEach(legajo => {
    		if (legajo == this.user.legajo){
    			this.toastr.error('Este legajo ya se encuentra registrado', 'Tuvimos un problema :(');
    			document.getElementById('legajo')?.classList.add('is-invalid');
    			this.validator = false;
    		}
    	});

    	this.mails.forEach(mail => {
    		if (mail == this.user.mail){
    			this.toastr.error('Este correo electrónico ya se encuentra registrado', 'Tuvimos un problema :(');
    			document.getElementById('email')?.classList.add('is-invalid');
    			this.validator = false;
    		}
    	});
    	if (this.validator){
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
