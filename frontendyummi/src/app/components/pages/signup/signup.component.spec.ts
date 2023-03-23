import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SignupComponent } from './signup.component';
import { UsersService } from 'src/app/services/users.service';
import { async, of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: UsersService;
  let httpMock: HttpTestingController;
  let toastrService: ToastrService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        FilestackModule],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Expect SignupComponent Creation', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    httpMock.match('api/users/');
  });

  it('should populate legajos and mails arrays after getting users', (() => {
    spyOn(component.userService, 'getUsers').and.returnValue(of([{ legajo: 123, mail: 'user1@example.com' }, { legajo: 456, mail: 'user2@example.com' }]));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.legajos).toEqual(['123', '456']);
      expect(component.mails).toEqual(['user1@example.com', 'user2@example.com']);
    });
    httpMock.match('api/users/');
  }));

  it('should check if legajo already exists', fakeAsync(() => {
    component.legajos = ['1234', '5678'];
    spyOn(toastrService, 'error');
    spyOn(document, 'getElementById').and.callThrough();
    component.user = { name: 'test', legajo: '1234', mail: 'newemail@example.com', password: 'mypassword' };
    component.validator = true;

    component.signUp();

    tick();

    expect(toastrService.error).toHaveBeenCalledWith('Este legajo ya se encuentra registrado', 'Tuvimos un problema :(');
    expect(document.getElementById).toHaveBeenCalledWith('legajo');
    expect(component.validator).toBeFalsy();
    httpMock.match('api/users/');
  }));

  it('should check if email already exists', fakeAsync(() => {
    component.mails = ['existingemail@example.com', 'anotheremail@example.com'];
    spyOn(toastrService, 'error');
    spyOn(document, 'getElementById').and.callThrough();
    component.user = { name: 'test', legajo: '1234', mail: 'existingemail@example.com', password: 'mypassword' };
    component.validator = true;

    component.signUp();

    tick();

    expect(toastrService.error).toHaveBeenCalledWith('Este correo electrónico ya se encuentra registrado', 'Tuvimos un problema :(');
    expect(document.getElementById).toHaveBeenCalledWith('email');
    expect(component.validator).toBeFalsy();
    httpMock.match('api/users/');
  }));

  it('should register new user', fakeAsync(() => {
    spyOn(component.authService, 'signUp').and.callThrough();
    spyOn(localStorage, 'setItem');
    spyOn(component.router, 'navigate');
    spyOn(console, 'log');
    component.legajos = ['1234', '5678'];
    component.mails = ['existingemail@example.com', 'anotheremail@example.com'];
    component.user = { name:'test', legajo: '9012', mail: 'newemail@example.com', password: 'mypassword' };
    component.validator = true;

    component.signUp();

    tick();

    expect(component.authService.signUp).toHaveBeenCalledWith(component.user);
    // expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mytoken');
    // expect(component.router.navigate).toHaveBeenCalledWith(['/perfil']);
    // expect(console.log).toHaveBeenCalledWith('mytoken');
    httpMock.match('api/users/');
    httpMock.match('api/users/signup');


  }));
  

  it('getLegajos', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.getLegajos).toBeDefined();
    expect(app.getLegajos).toBeTruthy();
    expect(app.users).not.toBeNull;
    expect(app.legajos).not.toBeNull;
    expect(app.mails).not.toBeNull;
    httpMock.match('api/users/'); // Replace with your API url
  });

  it('signUp', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.signUp).toBeDefined();
    expect(app.signUp).toBeTruthy();
    httpMock.match('api/users/');
    httpMock.match('api/users/');
  });

  it('Succesfull signUp', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    let user = app.user;
    user.name = 'JasmineTest';
    user.mail = 'Jasmine@test.com';
    user.password = '123';
    user.legajo = '5998';
    expect(app.signUp).toBeDefined();
    expect(app.signUp).toBeTruthy();
    app.signUp();
    expect(app.authService.signUp(user).subscribe).toBeTrue;
    expect(app.router.navigate(['/perfil'])).toBeTrue;
    httpMock.match('api/users/');
    httpMock.match('api/users/signup');
  });

  it('UnSuccesfull signUp', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    let user = app.user;
    user.name = 'JasmineTest';
    user.mail = 'daviddonayo@hotmail.com';
    user.password = '123';
    user.legajo = '5998';
    expect(app.signUp).toBeDefined();
    expect(app.signUp).toBeTruthy();
    app.signUp();
    expect(app.validator).toBeFalse;
    httpMock.match('api/users/');
    httpMock.match('api/users/');
    httpMock.match('api/users/signup');
  });

  it('should call getUsers method and set users', () => {
    // Arrange
    const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    spyOn(userService, 'getUsers').and.returnValue(of(users));

    // Act
    component.getLegajos().then(() => {
      // Assert
      expect(component.users).toEqual(users);
    });

    httpMock.match('api/users/');
    //const req = httpMock.match('api/users/'); // Replace with your API url
    //expect(req.request.method).toEqual('GET');
    //req.flush(users);
  });

  
});
