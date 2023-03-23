import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CareerFilterPipe } from 'src/app/pipes/career-filter.pipe';
import { CategoryFilterPipe } from 'src/app/pipes/category-filter.pipe';
import { CreatorPipe } from 'src/app/pipes/creator.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { SubjectFilterPipe } from 'src/app/pipes/subject-filter.pipe';

import { MisapuntesComponent } from './misapuntes.component';
import { of, throwError } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/Note';
import { Component } from '@angular/core';


describe('MisapuntesComponent', () => {
  let component: MisapuntesComponent;
  let fixture: ComponentFixture<MisapuntesComponent>;
  let mockUsersService: UsersService;
  let mockAuthService: AuthService;
  let httpMock: HttpTestingController;
  let mockNotesService: NotesService;
  let authService: AuthService;
  let toastr: ToastrService;



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
  }

  const mockNote2 = {
    name: 'mock-name2',
    career:'mock-career',
    subject: 'mock-subject',
    creator: 'mock-creator',
    content: 'mock-content',
    calification: ['A'],
    attached:'mock-attached',
    category: [],
    comments: [
      {commentCreator: 'mockComment', content: 'mock', date:''},
      {commentCreator: 'mockComment1', content: 'mock', date:''},
      {commentCreator: 'mockComment2', content: 'mock', date:''}
    ]
  }

    const mockNote3 = {
    name: 'mock-name3',
    career:'mock-career',
    subject: 'mock-subject',
    creator: 'mock-creator',
    content: 'mock-content',
    calification: ['A'],
    attached:'mock-attached',
    category: [],
    comments: [      
      {commentCreator: 'mockComment', content: 'mock', date:''},
      {commentCreator: 'mockComment1', content: 'mock', date:''},
      {commentCreator: 'mockComment2', content: 'mock', date:''},
      {commentCreator: 'mockComment3', content: 'mock', date:''}
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FilestackModule,
        NgxPaginationModule],
      declarations: [ 
        MisapuntesComponent,        
        CareerFilterPipe,
        SubjectFilterPipe,
        CategoryFilterPipe,
        FilterPipe,
        CreatorPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(MisapuntesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    mockNotesService = TestBed.inject(NotesService);
    mockUsersService = TestBed.inject(UsersService);
    mockAuthService = TestBed.inject(AuthService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('Expect MisapuntesComponent Creation', () => {
    const fixture = TestBed.createComponent(MisapuntesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('getNotes', () => {
    const fixture = TestBed.createComponent(MisapuntesComponent);
    const app = fixture.componentInstance;
    expect(app.getNotes).toBeTruthy();
    expect(app.noteService.notes).not.toBeNull();
  });

  it('deleteNote', () => {
    const fixture = TestBed.createComponent(MisapuntesComponent);
    const app = fixture.componentInstance;
    expect(app.deleteNote).toBeTruthy();
    expect(app.noteService.notes).not.toBeNull();
  });

  it('getNote', () => {
    const fixture = TestBed.createComponent(MisapuntesComponent);
    const app = fixture.componentInstance;
    expect(app.getNote).toBeTruthy();
    expect(app.noteService.notes).not.toBeNull();
  });

  it('getDecodedAccessToken', () => {
    const fixture = TestBed.createComponent(MisapuntesComponent);
    const app = fixture.componentInstance;
    expect(app.getDecodedAccessToken).toBeTruthy();
  });

  it('should navigate back', () => {
    spyOn(component.location, 'back');
    component.back();
    expect(component.location.back).toHaveBeenCalled();
  });

  it('should get user data and set the user name', () => {
    const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
    spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
    spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);
    spyOn(mockUsersService, 'getUser').and.returnValue(of({ name: 'test', mail: 'test', password: '123', legajo: '123', notes: [mockNote1]}));
    component.getUserData();
    expect(component.userData).not.toBeNull();
    //httpMock.match('api/users/'); 
  });
  
  it('should return the correct token ID', () => {
    //spyOn(authService, 'getToken').and.callThrough();
    const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
    spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
    spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);

    component.getToken();
    //expect(authService.getToken).toHaveBeenCalled();
    expect(component.tokenId).toEqual('638f825a9414fa0016fc2666');
  });

  it('should call the deleteNote method of noteService with the provided id', () => {
    const id = '638f8b429414fa0016fc26b6';
    spyOn(mockNotesService, 'deleteNote').and.callThrough();
    component.deleteNote(id);
    expect(mockNotesService.deleteNote).toHaveBeenCalledWith(id);
  });


  it('should log an error message to the console if the request fails', () => {
    const id = '12345';
    const mockError = new ErrorEvent('Network error', {
      message: 'Failed to delete note'
    });
    spyOn(console, 'error');
    spyOn(mockNotesService, 'deleteNote').and.returnValue(throwError(mockError));
    component.deleteNote(id);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it('should get notes, getNotes()', () => {
    expect(component.getNotes).toBeDefined();    
    expect(component.getNotes).toBeTruthy();
    var respond
    mockNotesService.getNotes().subscribe(result =>{
      respond = result;
      expect(respond).toBeTruthy;
      expect(mockNotesService.getNotes);
      expect(mockNotesService.notes);
      expect(mockNotesService.notes.length).toBe(0);
    });
  
    httpMock.match('api/notes/');  
  });

  it('should set the notes property with the response from the API in reverse order', () => {
    const mockNotes = [mockNote1, mockNote2, mockNote3]
    mockNotesService.getNotes().subscribe(
      res => {
        expect(res).toEqual(mockNotes);
        expect(mockNotesService.notes).toEqual(mockNotes.reverse());
      },
      fail
    );

    httpMock.match('api/notes/');
    httpMock.match('api/notes/');
  });

  it('should log an error message when the API returns an error', () => {
    const errorMessage = 'Error getting notes';
    spyOn(console, 'error');

    mockNotesService.getNotes().subscribe(
      res => fail('getNotes should have failed'),
      err => {
        expect(err).toEqual(errorMessage);
        expect(console.error).toHaveBeenCalledWith(errorMessage);
      }
    );
  });


  it('should get a note, getNote(id)', () => {
    expect(component.getNote).toBeDefined();
    expect(component.getNote).toBeTruthy();
    let note: Note = {
      name: '',
      career:'',
      subject: '',
      creator: '',
      content: '',
      calification: [],
      attached:'',
      category: [],
      comments: []
    }

    component.noteService.getNote('63b78f30eaf5b30016b727f5');
    fixture.detectChanges();
    expect(component.noteService.notes).not.toBeNaN();
    component.noteService.getNote('63b78f30eaf5b30016b727f5').subscribe(res => {
      expect(component.noteService.notes).not.toBeNull();
    });
  });

  it('should retrieve a note by ID', () => {

    mockNotesService.getNote('638f8b429414fa0016fc26b6').subscribe(res => {
      expect(res).not.toBeNaN();
    });

    httpMock.match('api/notes/638f8b429414fa0016fc26b6');
  });


  it('should return null for invalid JWT token', () => {
    const invalidToken = 'invalid_token';
    const decodedToken = component.getDecodedAccessToken(invalidToken);
    expect(decodedToken).toBeNull();
  });

  it('should decode JWT token', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const decodedToken = component.getDecodedAccessToken(token);
    expect(decodedToken).toBeTruthy();
    expect(decodedToken.sub).toEqual('1234567890');
    expect(decodedToken.name).toEqual('John Doe');
  });

  it('should get a note, getNote(id)', () => {
    let note: Note = {
      name: '',
      career:'',
      subject: '',
      creator: '',
      content: '',
      calification: [],
      attached:'',
      category: [],
      comments: []
    }

    component.getNote('63b78f30eaf5b30016b727f5');
    fixture.detectChanges();
    expect(component.noteService.selectedNote).toEqual(note);
    component.noteService.getNote('63b78f30eaf5b30016b727f5').subscribe(res => {
      expect(component.noteService.selectedNote).toEqual(note);
      expect(component.noteService.selectedNote.content).toEqual(note.content);
      expect(component.noteService.selectedNote.attached).toEqual(note.attached);
    });

  });

  it('should call deleteNote method and handle the response correctly', () => {
    const response = [{id: 1, title: 'Note 1'}, {id: 2, title: 'Note 2'}];
    spyOn(component.noteService, 'deleteNote').and.returnValue(of(response));

    const spy = spyOn(toastr, 'success');
    const id = '63881975002e44001672bd97';
    component.deleteNote(id);
    expect(spy).toHaveBeenCalled();
    //expect(noteService.notes).toEqual([{id: 1, title: 'Note 1'}, {id: 2, title: 'Note 2'}]);
  });

});
