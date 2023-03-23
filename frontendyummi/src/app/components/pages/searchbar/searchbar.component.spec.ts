import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule } from 'ngx-toastr';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FilestackModule,
        ],
      declarations: [ SearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check user', () => {
    let user = component.authService.user;
    user.mail = 'test@postman.com';
    user.password = 'test';
    component.authService.signIn(user);

    const spy1 = spyOn(component.authService, 'loggedIn');
    spy1.and.returnValue(false);
    component.checkUser();
    expect(spy1).toHaveBeenCalled();

    
  });
});
