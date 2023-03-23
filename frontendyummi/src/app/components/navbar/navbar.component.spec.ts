import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import {Observable, async, of, throwError } from 'rxjs';
import { PerfilComponent } from '../pages/perfil/perfil.component';
import { AuthGuard } from 'src/app/auth.guard';
import {Location} from '@angular/common';
import { User } from 'src/app/models/User';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let router: Router;
  let toastr: ToastrService;
  const mockUser = {
    mail: 'test@postman.com',
    password: 'test'
  }
  const mockAuthService: {
    signUp: (user: any) => Observable<any>,
    signIn: (user: any) =>Observable<any>,
    loggedIn: () => Boolean,
    getToken: () => String | null,
    logOut: () => void,
  } = {
    signUp: (user: any) => of(),
    signIn: (user: any) => of(),
    loggedIn: () => true,
    getToken: () => new String,
    logOut: () => of()
  }

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
      providers: [{provide: AuthService, useValue: mockAuthService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
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

  it('should signin, SignIn()', () => {
    expect(component.signIn).toBeDefined();
    expect(component.signIn).toBeTruthy();

    component.user = mockUser;
    component.authService.signIn(component.user).subscribe(result => {
      expect(result).toBeDefined();
      expect(result).not.toBeUndefined();
    });

    let spy = spyOn(component.authService.signIn(component.user), 'subscribe');
    component.signIn();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled;
  });

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
    // getNoteSpy.and.returnValue(of(mockNote));
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
      result.token
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

  // it('should signIn and return a token, signIn()', () => {
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmODI1YTk0MTRmYTAwMTZmYzI2NjYiLCJpYXQiOjE2NzU5NDgwODZ9.uPRhu_UEmN_fFfsXD8seu3pxgeM_0TN0ArhN7krZnOE'

  //   const signInSpy = spyOn(component.authService, 'signIn')
    
  //   let user = component.user;
  //   user.mail = 'test@postman.com';
  //   user.password = 'test';
    
  //   signInSpy.and.returnValue(of(token));
  //   component.authService.signIn(user);
  //   fixture.detectChanges();
  //   expect(localStorage.token).toEqual(token);
  //   expect(component.authService.signIn).toHaveBeenCalled();
  //   expect(component.authService.signIn).not.toThrowError;

  // });
  
  it("should call getUsers and return list of users", ((done) => {
    // Arrange
    let response : undefined;
    
    let user = component.user;
    user.mail = 'test@postman.com';
    user.password = 'test';
    // Act
    component.authService.signIn(user);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
        //expect(localStorage.token).toEqual(response);
        done();
    });
  }));

// it('should navigate', () => {
//     const navigateSpy = spyOn(component.authService, 'signIn');

//     navigateSpy.and.callThrough();
//     let user = component.user;
//     user.mail = 'test@postman.com';
//     user.password = 'test';
//     component.authService.signIn(user);
//     expect(navigateSpy).toHaveBeenCalledWith(Object({ mail: 'test@postman.com', password: 'test' }));
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
    // spyOn(document.getElementById('mailInput') as HTMLElement, 'classList').and.callThrough();
    // spyOn(document.getElementById('pwInput') as HTMLElement, 'classList').and.callThrough();

    component.signIn();

    expect(toastr.error).toHaveBeenCalledWith('Usuario y/o contraseña invalidos', 'Tuvimos un problema :(');

    //expect(document.getElementById('mailInput')?.classList.add).toHaveBeenCalledWith('is-invalid');
    //expect(document.getElementById('pwInput')?.classList.add).toHaveBeenCalledWith('is-invalid');
    //expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

});
