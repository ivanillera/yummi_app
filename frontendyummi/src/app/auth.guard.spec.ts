import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import {Location} from '@angular/common';
import { of } from 'rxjs';
import * as exp from 'constants';


// describe('AuthGuard', () => {
//   let guard: AuthGuard;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule]
//     });
//     guard = TestBed.inject(AuthGuard);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });

//   it('canActivate be created', () => {
//     expect(guard.canActivate).toBeDefined();
//     expect(guard.canActivate).toBeTruthy();
//     expect(guard.canActivate).toBeFalse;
//     const location: Location = TestBed.get(Location);
//     expect(location.path()).toBe('');
//   });

//   it('should canActivate be false', () => {
//     expect(guard.canActivate).toBeDefined();
//     expect(guard.canActivate).toBeTruthy();
//     expect(guard.canActivate).toBeFalse;
//     const location: Location = TestBed.get(Location);
//     expect(location.path()).toBe('');
//   });

//   it('should canActivate be false', () => {
//     const canActivateSpy = spyOn(guard, 'canActivate');
//     canActivateSpy.and.returnValue(false);
//     guard.canActivate();
//     expect(canActivateSpy).toHaveBeenCalled();
//     expect(guard.canActivate).toBeFalse;
//     expect(guard.authService.loggedIn).toBeFalse;
//   });
// });

//import { TestBed } from '@angular/core/testing';
//import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
//import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule],
      providers: [
        AuthGuard,
        AuthService
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access if user is logged in', () => {
    spyOn(authService, 'loggedIn').and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  });

  it('should redirect to login page if user is not logged in', () => {
    spyOn(authService, 'loggedIn').and.returnValue(false);
    spyOn(router, 'navigate');
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
