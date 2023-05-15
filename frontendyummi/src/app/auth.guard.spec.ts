import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';


// Describe('AuthGuard', () => {
//   Let guard: AuthGuard;

//   BeforeEach(() => {
//     TestBed.configureTestingModule({
//       Imports: [
//         HttpClientTestingModule,
//         RouterTestingModule]
//     });
//     Guard = TestBed.inject(AuthGuard);
//   });

//   It('should be created', () => {
//     Expect(guard).toBeTruthy();
//   });

//   It('canActivate be created', () => {
//     Expect(guard.canActivate).toBeDefined();
//     Expect(guard.canActivate).toBeTruthy();
//     Expect(guard.canActivate).toBeFalse;
//     Const location: Location = TestBed.get(Location);
//     Expect(location.path()).toBe('');
//   });

//   It('should canActivate be false', () => {
//     Expect(guard.canActivate).toBeDefined();
//     Expect(guard.canActivate).toBeTruthy();
//     Expect(guard.canActivate).toBeFalse;
//     Const location: Location = TestBed.get(Location);
//     Expect(location.path()).toBe('');
//   });

//   It('should canActivate be false', () => {
//     Const canActivateSpy = spyOn(guard, 'canActivate');
//     CanActivateSpy.and.returnValue(false);
//     Guard.canActivate();
//     Expect(canActivateSpy).toHaveBeenCalled();
//     Expect(guard.canActivate).toBeFalse;
//     Expect(guard.authService.loggedIn).toBeFalse;
//   });
// });

//Import { TestBed } from '@angular/core/testing';
//Import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
//Import { AuthGuard } from './auth.guard';
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
