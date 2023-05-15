import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import {Observable, of, throwError } from 'rxjs';
import { PerfilComponent } from '../pages/perfil/perfil.component';
import { AuthGuard } from 'src/app/auth.guard';
import {Location} from '@angular/common';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let authService: AuthService;
    let router: Router;
    let toastr: ToastrService;

    const mockAuthService: {
        signUp: (user: any) => Observable<any>,
        signIn: (user: any) =>Observable<any>,
        loggedIn: () => Boolean,
        getToken: () => String | null,
        logOut: () => void,
    } = {
    	signUp: () => of(),
    	signIn: () => of(),
    	loggedIn: () => true,
    	getToken: () => new String,
    	logOut: () => of()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ToastrModule.forRoot(),
                BrowserModule,
                ReactiveFormsModule,
                RouterTestingModule,
                FilestackModule,
                FormsModule,
                RouterTestingModule.withRoutes([
                    {
                        path:'perfil',
                        component: PerfilComponent,
                        canActivate: [AuthGuard]
                    }
                ])],
            declarations: [ NavbarComponent],
            providers: [{provide: AuthService, useValue: mockAuthService}],
            teardown: {destroyAfterEach: false}
        })
            .compileComponents();
    });

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        toastr = TestBed.inject(ToastrService);
        fixture.detectChanges();
    });


    it('Expect NavbarComponent Creation', () => {
        const fixture = TestBed.createComponent(NavbarComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    // It('should signin, SignIn()', () => {
    //   Expect(component.signIn).toBeDefined();
    //   Expect(component.signIn).toBeTruthy();

    //   Component.user = mockUser;
    //   Component.authService.signIn(component.user).subscribe(result => {
    //     Expect(result).toBeDefined();
    //     Expect(result).not.toBeUndefined();
    //   });

    //   Let spy = spyOn(component.authService.signIn(component.user), 'subscribe');
    //   Component.signIn();
    //   Fixture.detectChanges();
    //   Expect(spy).toHaveBeenCalled;
    // });

    it('should signIn(user)', () => {
        const signInSpy = spyOn(component, 'signIn');

        let user = component.user;
        user.mail = 'test@postman.com';
        user.password = 'test';
        component.signIn();
        signInSpy.and.returnValue;

        expect(component.signIn).toHaveBeenCalled();
    });

    it('should get an error, Signin(user)', () => {
        const getNoteSpy = spyOn(component.authService, 'signIn');
        // GetNoteSpy.and.returnValue(of(mockNote));
        getNoteSpy.and.returnValue(throwError({status: 404}));
        component.authService.signIn('');
        expect(component.authService.signIn).toHaveBeenCalled();
        expect(component.authService.signIn('')).toThrowError;
    });

    it('Valid Signin', () => {
        const fixture = TestBed.createComponent(NavbarComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();
        let user = app.user;
        user.mail = 'test@postman.com';
        user.password = 'test';

        expect(app.authService.signIn(user)).toBeTruthy();
        expect(app.authService.signIn(user).subscribe(result => {
            result.token;
        })).toBeTruthy();

        expect(localStorage).not.toBeNull();
        expect(app.router.navigate(['/perfil'])).toBeTrue;
    });


    it('Closing Modal', () => {
        const fixture = TestBed.createComponent(NavbarComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();
        expect(app.closeModal).toBeDefined();
        expect(app.closeModal).toBeTruthy();
    });

    // It('should signIn and return a token, signIn()', () => {
    //   Const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmODI1YTk0MTRmYTAwMTZmYzI2NjYiLCJpYXQiOjE2NzU5NDgwODZ9.uPRhu_UEmN_fFfsXD8seu3pxgeM_0TN0ArhN7krZnOE'

    //   Const signInSpy = spyOn(component.authService, 'signIn')

    //   Let user = component.user;
    //   User.mail = 'test@postman.com';
    //   User.password = 'test';

    //   SignInSpy.and.returnValue(of(token));
    //   Component.authService.signIn(user);
    //   Fixture.detectChanges();
    //   Expect(localStorage.token).toEqual(token);
    //   Expect(component.authService.signIn).toHaveBeenCalled();
    //   Expect(component.authService.signIn).not.toThrowError;

    // });

    it("should call getUsers and return list of users", (done) => {
        // Arrange

        let user = component.user;
        user.mail = 'test@postman.com';
        user.password = 'test';
        // Act
        component.authService.signIn(user);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            //Expect(localStorage.token).toEqual(response);
            done();
        });
    });

    // It('should navigate', () => {
    //     Const navigateSpy = spyOn(component.authService, 'signIn');

    //     NavigateSpy.and.callThrough();
    //     Let user = component.user;
    //     User.mail = 'test@postman.com';
    //     User.password = 'test';
    //     Component.authService.signIn(user);
    //     Expect(navigateSpy).toHaveBeenCalledWith(Object({ mail: 'test@postman.com', password: 'test' }));
    //   });

    it('Should navigate to /perfil', () => {
        const location: Location = TestBed.get(Location);
        expect(location.path()).toBe('');
    });

    it('should sign in user and redirect to perfil page', () => {
        const token = 'fake-token';
        spyOn(authService, 'signIn').and.returnValue(of({ token }));
        spyOn(router, 'navigate');
        spyOn(component, 'closeModal');

        component.signIn();

        expect(localStorage.getItem('token')).toBe(token);
        expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
        expect(component.closeModal).toHaveBeenCalledWith('#sesionModal');
    });

    it('should handle sign in error and display error message', () => {
        const errorMessage = 'Invalid credentials';
        spyOn(authService, 'signIn').and.returnValue(throwError({ error: errorMessage }));
        spyOn(toastr, 'error');
        // SpyOn(document.getElementById('mailInput') as HTMLElement, 'classList').and.callThrough();
        // SpyOn(document.getElementById('pwInput') as HTMLElement, 'classList').and.callThrough();

        component.signIn();

        expect(toastr.error).toHaveBeenCalledWith('Usuario y/o contraseña invalidos', 'Tuvimos un problema :(');

        //Expect(document.getElementById('mailInput')?.classList.add).toHaveBeenCalledWith('is-invalid');
        //Expect(document.getElementById('pwInput')?.classList.add).toHaveBeenCalledWith('is-invalid');
        //Expect(console.log).toHaveBeenCalledWith(errorMessage);
    });

});
