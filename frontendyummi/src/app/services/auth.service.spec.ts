import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken()', () => {
    expect(service.getToken()).toBeTruthy;
  });

  it('should signIn(user)', () => {
    const signInSpy = spyOn(service, 'signIn');

    let user = service.user;
    user.mail = 'test@postman.com';
    user.password = 'test';
    service.signIn(user);
    signInSpy.and.returnValue(of(user));

    expect(service.signIn).toHaveBeenCalled();
  });

  it('should logOut', () => {
    expect(service.logOut()).toBeTruthy;
    const signInSpy = spyOn(service, 'logOut');
    service.logOut();
    signInSpy.and.callThrough;

    expect(service.logOut).toHaveBeenCalled();
  });
});
