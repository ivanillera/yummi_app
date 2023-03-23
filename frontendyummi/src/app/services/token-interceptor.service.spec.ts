import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule]
    });
    service = TestBed.inject(TokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check the inspector', () => {
    const next: any = {
      handle: () => {
        return Observable.create((subscriber: { complete: () => void; }) => {
          subscriber.complete();
        });
      }
    };
    
    const requestMock = new HttpRequest('GET', '/test');
    
    service.intercept(requestMock, next).subscribe(() => {
      expect(service.counter).toBeGreaterThan(0);
    });
  })
});
