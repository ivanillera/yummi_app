import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Comment } from '../../../models/Comment';

import { ApunteComponent } from './apunte.component';
import { getNameOfJSDocTypedef } from 'typescript';
import { NotesService } from 'src/app/services/notes.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/Note';
import { Observable, of, throwError } from 'rxjs';
import { Apunte } from 'src/app/models/Apunte';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UrlsafePipe } from 'src/app/pipes/urlsafe.pipe';
import { AuthService } from 'src/app/services/auth.service';

const mockNote = {
  name: 'mock-name',
  career:'mock-career',
  subject: 'mock-subject',
  creator: 'mock-creator',
  content: 'mock-content',
  calification: [],
  attached:'mock-attached',
  category: [],
  comments: []
}

const mockComment = { commentCreator: 'mockComment', content: 'mock', date:''}

const mockedNotesService: {
  getNotes: () => Observable<Note[]>,
  getNote: (id: string) => Observable<any>,
  createNote: (note:Note) => Observable<any>,
  commentNote: (note:Note, id:string, comment: Comment) => Observable<any>,
  updateNote: (note:Note, id:string) => Observable<any>,
  agregarLike: (note:Note, id:string, userId: string) => Observable<any>,
  removerLike: (note:Note, id:string, userId: string) => Observable<any>,
  deleteNote: (id: string) => Observable<any>,
  upload: (file:any) => Observable<any>;
} = {
  getNotes: () => of(),
  getNote: (id: string) => of(mockNote),
  createNote: (note:Note) => of(note),
  commentNote: (note:Note, id:string, comment: Comment) => of(note),
  updateNote: (note:Note, id:string) => of(note),
  agregarLike: (note:Note, id:string, userId: string) => of(note),
  removerLike: (note:Note, id:string, userId: string) => of(note),
  deleteNote: (id: string) => of(),
  upload: (file:any) => of()
}



describe('ApunteComponent', () => {
  let component: ApunteComponent;
  let fixture: ComponentFixture<ApunteComponent>;
  let httpMock: HttpTestingController;
  let commentService: CommentsService;
  let notesServiceSpy: jasmine.SpyObj<NotesService>;
  let formBuilder: FormBuilder;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let mockAuthService: AuthService;
  let mockUsersService: UsersService;


  beforeEach(async () => {
    notesServiceSpy = jasmine.createSpyObj('NotesService', ['getNote', 'agregarLike', 'removerLike']);
    notesServiceSpy.getNote.and.returnValue(of(mockNote));
    notesServiceSpy.agregarLike.and.returnValue(of(null));
    notesServiceSpy.removerLike.and.returnValue(of(null));
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);


    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FilestackModule,
        ],
      declarations: [ ApunteComponent, UrlsafePipe ],
      providers: [{provide: NotesService, useValue: mockedNotesService}]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApunteComponent);
    component = fixture.componentInstance;
    formBuilder = new FormBuilder();
    component.commentForm = formBuilder.group({
      content: ''
    });
    commentService = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
    mockAuthService = TestBed.inject(AuthService);
    mockUsersService = TestBed.inject(UsersService);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('Expect NavbarComponent', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('getComments', () => {
    expect(component.getComments).toBeTruthy();
  });

  it('likear', () => {
    expect(component.likear).toBeTruthy();
  });

  it('GetUserData', () => {
    expect(component.getUserData).toBeTruthy();
  });

  it('getDecodedAccessToken', () => {
    expect(component.getDecodedAccessToken).toBeTruthy();
  });


  it('unlockCommentButton', () => {
    expect(component.unlockCommentButton).toBeTruthy();
  });

  it('should add a comment', () => {
    expect(component.addComment).toBeTruthy();
  });

  it('should handle error,', () => {
   // notesServiceSpy.commentNote.and.returnValue;
    component.commentForm.setValue({ content: 'This is a comment' });

    component.addComment();

    expect(notesServiceSpy.commentNote).toHaveBeenCalled;
    expect(toastrService.error).toHaveBeenCalled;
  });
  
  it('resetForm', () => {
    expect(component.resetForm).toBeTruthy();
  });

  it('should reset the comment form', () => {
    // Set some values in the comment form
    component.commentForm.get('content')?.setValue('Test content');

    // Call the resetForm function
    component.resetForm();

    // Expect the comment form to be reset to empty values
    expect(component.commentForm.get('content')?.value).toEqual(null);
  });

  it('should get a note, getNote(id)', () => {
    const getNoteSpy = spyOn(component.notesService, 'getNote');
    // getNoteSpy.and.returnValue(of(mockNote));
    getNoteSpy.and.returnValue(of());
    component.notesService.getNote('63b78f30eaf5b30016b727f5');
    expect(component.notesService.getNote).toHaveBeenCalled();
  });

  it('should get an error, getNote(id)', () => {
      const getNoteSpy = spyOn(component.notesService, 'getNote');
      // getNoteSpy.and.returnValue(of(mockNote));
      getNoteSpy.and.returnValue(throwError({status: 404}));
      component.notesService.getNote('');
      expect(component.notesService.getNote).toHaveBeenCalled();
      expect(component.notesService.getNote('123')).toThrowError;
  });

  it('should get comments, getComments()', () => {

    expect(component.getComments).toBeTruthy();
    expect(component.getComments).not.toBeNull;

    component.getComments();
    let response:Comment[] = [];
    

    let spy = spyOn(component.commentService.getComments(), 'subscribe')
    component.commentService.getComments();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled;

    component.commentService.getComments().subscribe((res) => {
      expect(res).toEqual([]);
      expect(component.commentService.comments).toEqual([]);
    })
    
    httpMock.match('api/comments/');

  });

  it('should add likes, agregarLike())', () => {
    const getCommentsSpy = spyOn(component.notesService, 'agregarLike');
    getCommentsSpy.and.returnValue(of());
    component.notesService.agregarLike(mockNote,'61fc2711c9aa8d0016006d7c','61fc27ddc9aa8d0016006d91');
    expect(component.notesService.agregarLike).toHaveBeenCalled();
  });

  it('should fetch comments from the server', () => {
    const dummyComments = [
      {  commentCreator: 'commentCreator',
         content: 'conten',
         date: 'date' },
    ];

    commentService.getComments().subscribe(comments => {
      expect(comments.length).toBe(1);
      expect(comments).toEqual(dummyComments);
    });

    const req = httpMock.expectOne('api/comments/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should handle errors when fetching comments', () => {
    const errorMessage = 'Http failure response for api/comments/: 500 Internal Server Error';
    spyOn(console, 'error');

    commentService.getComments().subscribe(() => {
      fail('Expected error callback to be called');
    }, error => {
      expect(error).toBeTruthy();
      //expect(console.error).toHaveBeenCalledWith(error);
      expect(error.message).toContain(errorMessage);
    });

    const req = httpMock.expectOne('api/comments/');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should initialize component properties', () => {
    expect(component.tokenId).toBeUndefined();
    expect(component.liked).toBeFalsy();
    expect(component.note).toEqual(mockNote);
  });

  it('should set liked to true when adding a like', () => {
    component.tokenId = 'test-token';
    component.liked = false;
    component.note.calification = [];
    notesServiceSpy.agregarLike.and.returnValue(of(null));

    component.likear();

    //expect(notesServiceSpy.agregarLike).toHaveBeenCalledWith(mockNote, '1', 'test-token');
    expect(component.liked).toBeTruthy();
  });

  it('should set liked to false when removing a like', () => {
    component.tokenId = 'test-token';
    component.liked = true;
    component.note.calification = ['test-token'];
    notesServiceSpy.removerLike.and.returnValue(of(null));

    component.likear();

    //expect(notesServiceSpy.removerLike).toHaveBeenCalledWith(mockNote, '1', 'test-token');
    expect(component.liked).toBeFalsy();
  });

  it('should show an error message and navigate to /apuntes when tokenId is null', () => {
    component.tokenId = null;
    spyOn(component.toastr, 'error');
    spyOn(component.router, 'navigate');

    component.likear();

    expect(component.toastr.error).toHaveBeenCalledWith('Debes iniciar sesión para poder dar likes!', 'Error');
    expect(component.router.navigate).toHaveBeenCalledWith(['/apuntes']);
    expect(notesServiceSpy.agregarLike).not.toHaveBeenCalled();
    expect(notesServiceSpy.removerLike).not.toHaveBeenCalled();
  });

  it('should call NotesService.commentNote and show success toastr when addComment is called', () => {
    // mock data
    const COMMENT = {
      commentCreator: 'John Doe',
      content: 'This is a comment',
      date: '23/02/2023 12:34:56'
    };
    //spyOn(component.commentForm, 'get').and.returnValue(of());
    spyOn(component.notesService, 'commentNote').and.returnValue(of({ success: true }));
    spyOn(component.toastr, 'success');

    const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
    spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
    spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);
    spyOn(mockUsersService, 'getUser').and.returnValue(of({ name: 'test', mail: 'test', password: '123', legajo: '123', notes: [mockNote]}));
    component.getUserData();
    expect(component.userData).not.toBeNull();
    // call method
    component.note = mockNote;
    component.id = '1';
    component.tokenId = '1';
    component.userData.name = 'test';
    fixture.detectChanges();
    component.addComment();
    component.notesService.commentNote(component.note,component.id, COMMENT);

    
    // assert that NotesService.commentNote was called with the correct parameters
    //expect(notesServiceSpy.commentNote).toHaveBeenCalledWith(component.note, component.id, COMMENT);

    // assert that toastr.success was called with the correct message
    expect(component.toastr.success).toHaveBeenCalledWith('Comentario agregado!');
  });

  it('should disable the button if content is empty', () => {
    component.unlockCommentButton();
    expect((<HTMLInputElement>document.getElementById('buttonComment')).disabled).toBe(true);
  });

  it('should enable the button if content is not empty', () => {
    component.commentForm.get('content')?.setValue('Lorem ipsum');
    component.unlockCommentButton();
    expect((<HTMLInputElement>document.getElementById('buttonComment')).disabled).toBe(false);
  });


  it('should create a link with a download attribute and click it', () => {
    spyOn(document, 'createElement').and.callThrough();
    spyOn(window.URL, 'createObjectURL').and.returnValue('fake-url');
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();
    spyOn(window.URL, 'revokeObjectURL').and.callThrough();
    
    component.savePage();

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    //expect(document.body.appendChild).toHaveBeenCalled();
    //expect(document.body.removeChild).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });

  

});
