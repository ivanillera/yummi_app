import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule } from 'ngx-toastr';

import { InfoperfilComponent } from './infoperfil.component';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

describe('InfoperfilComponent', () => {
    let component: InfoperfilComponent;
    let fixture: ComponentFixture<InfoperfilComponent>;
    let mockUsersService: UsersService;
    let mockAuthService: AuthService;

    const mockNote1 = {
        name: 'mock-name1',
        career:'mock-career',
        subject: 'mock-subject',
        creator: 'mock-creator',
        content: 'mock-content',
        calification: ['A'],
        attached:'mock-attached',
        category: [],
        comments: []
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ToastrModule.forRoot(),
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                FilestackModule],
            declarations: [ InfoperfilComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoperfilComponent);
        mockUsersService = TestBed.inject(UsersService);
        mockAuthService = TestBed.inject(AuthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Expect InfoperfilComponent Creation', () => {
        const fixture = TestBed.createComponent(InfoperfilComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('getUserData', () => {
        const fixture = TestBed.createComponent(InfoperfilComponent);
        const app = fixture.componentInstance;
        expect(app.getUserData).toBeTruthy();
        expect(app.userData).not.toBeNull;
    });

    it('getDecodedAccessToken', () => {
        const fixture = TestBed.createComponent(InfoperfilComponent);
        const app = fixture.componentInstance;
        expect(app.getDecodedAccessToken).toBeTruthy();
    });

    it('should get user data and set the user name', () => {
        const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
        spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
        spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);
        spyOn(mockUsersService, 'getUser').and.returnValue(of({ name: 'test', mail: 'test', password: '123', legajo: '123', notes: [mockNote1]}));
        component.getUserData();
        expect(component.userData).not.toBeNull();
        //HttpMock.match('api/users/');
    });

});
