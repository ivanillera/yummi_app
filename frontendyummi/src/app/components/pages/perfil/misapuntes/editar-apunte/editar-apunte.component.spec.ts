import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { FormBuilder, FormsModule, NG_VALUE_ACCESSOR, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule, FilestackService } from '@filestack/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NotesService } from 'src/app/services/notes.service';
import { CrearApunteComponent } from '../../../crear-apunte/crear-apunte.component';

import { EditarApunteComponent } from './editar-apunte.component';
import { Observable, async, of, throwError } from 'rxjs';
import { Note } from 'src/app/models/Note';
import { Subject } from 'src/app/models/Subject';
import { SubjectsService } from 'src/app/services/subjects.service';
import { ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';

describe('EditarApunteComponent', () => {
  let component: EditarApunteComponent;
  let fixture: ComponentFixture<EditarApunteComponent>;
  let mockUsersService: UsersService;
  let mockAuthService: AuthService;
  let httpMock: HttpTestingController;
  let mockNotesService: NotesService;
  let authService: AuthService;
  let filestackService: FilestackService;
  
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
      declarations: [ 
        EditarApunteComponent,
        CrearApunteComponent
      ],
      providers: [AppRoutingModule, NgForm,
        {provide: NotesService, useValue: mockedNotesService},
      ],
      teardown: {destroyAfterEach: false}
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(EditarApunteComponent);
    //filestackService = jasmine.createSpyObj('FilestackService', ['upload']);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    mockNotesService = TestBed.inject(NotesService);
    mockUsersService = TestBed.inject(UsersService);
    mockAuthService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Expect EditarApunteComponent Creation', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should upload a file and set the attached property of the note', async () => {
    // Arrange
    filestackService = jasmine.createSpyObj('FilestackService', ['upload']);
    const mockFile = new File(['mock content'], 'mock-file.pdf', { type: 'application/pdf' });
    //spyOn(filestackService, 'upload').and.returnValue(of({ data: { url: 'https://example.com/mock-file.pdf' } }));
    //const newComponent = new EditarApunteComponent(noteService, activatedRoute, formBuilder, authService, mockUsersService, subjectService, fileService,toastr,filestackService,router);

    // Act
    component.file = mockFile;
    await component.postFileStack();


    //expect(component.shortLink).toContain('https://cdn.filestackcontent.com/');
    //expect(component.note.attached).toContain('https://cdn.filestackcontent.com/');
    });

    it('should call postFileStack and display a success message if the file size is within the limit', async () => {
      spyOn(component, 'postFileStack').and.returnValue(Promise.resolve());
      spyOn(component.toastr, 'success');
      component.file = new File(['foo'], 'foo.txt', { type: 'text/plain', lastModified: new Date().getTime() });
      const event = { target: { files: [component.file], value: 'fakePath' } };
      await component.fileChanged(event);
      expect(component.postFileStack).toHaveBeenCalled();
    });


  it('enableUp', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    app.enableUp();
    expect(app.enableUp).toBeTruthy();
  });

  it('fileChanged', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.fileChanged).toBeTruthy();    
  });

  it('postFileStack', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.postFileStack).toBeTruthy();    
  });

  it('deleteFileStack', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.deleteFileStack).toBeTruthy();    
  });

  it('getUserData', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.getUserData).toBeTruthy(); 
    app.getUserData();
    expect(app.userData).not.toBeNull();
  });

  it('getSubjects', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.getSubjects).toBeTruthy(); 
    app.getSubjects
    expect(app.subjectsService.subjects).not.toBeNull();
  });

  it('CheckValidator is-invalid', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.CheckValidator).toBeTruthy(); 
    app.CheckValidator('career');
    fixture.detectChanges();
    expect(document.getElementById('career')?.classList).toBeDefined;
    expect(document.getElementById('career')?.classList).not.toBeNaN;
    expect(document.getElementById('career')?.classList).not.toBeNull;
    expect(document.getElementById('career')?.classList).not.toBeUndefined;

    expect(document.getElementById('career')?.classList).toContain('is-invalid');
  });

  it('updateNote', () => {
    const fixture = TestBed.createComponent(EditarApunteComponent);
    const app = fixture.componentInstance;
    expect(app.updateNote).toBeTruthy(); 
    app.note.name = 'Test Angular Jasmine updateNote()';
    app.note.career = 'Ing. Química';
    app.note.creator =  'Angular Test';
    app.note.subject = 'Algebra';
    app.note.content = 'Test Angular Jasmine';
    app.note.category.join('Apunte');
    app.updateNote();
    expect(app.updateNote).toBeTruthy();
  });

  it('updateNote Error', () => {
    expect(component.noteService.updateNote).toBeDefined;
    expect(component.noteService.updateNote).toBeTruthy;
    component.noteService.updateNote(mockNote,'');
    
  });
  
  it('should reset form', () => {
    expect(component.noteService.updateNote).toBeDefined;
    expect(component.noteService.updateNote).toBeTruthy;
    const debugElement = fixture.debugElement;
    const form: NgForm = debugElement.children[0].injector.get(NgForm);
    const spy = spyOn(component, 'resetForm');
    component.resetForm(form);
    fixture.detectChanges();
    form.reset();
    expect(spy).toHaveBeenCalled();
    expect(form.reset).toBeDefined();
    expect(form.reset).toBeTruthy();
  });

  it('should reset the form when resetForm() is called', () => {
    const debugElement = fixture.debugElement;
    //const form: NgForm = debugElement.children[0].injector.get(NgForm);
    const form: NgForm = debugElement.children[0].injector.get(NgForm);
    component.resetForm(form);
    //expect(form.controls['exampleControl'].value).toBe(null);
    expect(form.submitted).toBe(false);
  });

  it('getDecodedAccessToken', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.getDecodedAccessToken).toBeTruthy();
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

    component.noteService.getNote('63b78f30eaf5b30016b727f5');
    fixture.detectChanges();
    expect(component.note).toEqual(note);
    component.noteService.getNote('63b78f30eaf5b30016b727f5').subscribe(res => {
      expect(component.note).toEqual(note);
      expect(component.htmlContent).toEqual(note.content);
      expect(component.shortLink).toEqual(note.attached);
      expect(console.log('Nota', component.note)).toBeTrue;
    });

  });

  it('should get an error, getNote(id)', () => {
    const getNoteSpy = spyOn(component.noteService, 'getNote');
    // getNoteSpy.and.returnValue(of(mockNote));
    getNoteSpy.and.returnValue(throwError({status: 404}));
    component.noteService.getNote('');
    expect(component.noteService.getNote).toHaveBeenCalled();
    expect(component.noteService.getNote('123')).toThrowError;
  });

  it('should getSubjects, getSubjects()', () => {
    component.getSubjects();
    var res1 = component.subjectsService.getSubjects();
    expect(res1).toBeTruthy();
    expect(res1).not.toBeNaN;
    expect(res1).not.toBeUndefined;
    var res2 = component.subjectsService.getSubjects().subscribe(res => {  
      expect(res).toBeTruthy();
      expect(res).not.toBeNaN;
      expect(res).not.toBeUndefined; 
      expect(component.subjectsService.subjects).toEqual(res);
    });
    var res3 = component.subjectsService.subjects;
    expect(res3).not.toBeNaN;
    expect(res3).toBeUndefined;

    let spy = spyOn(component.subjectsService.getSubjects(), 'subscribe')
    component.getSubjects();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled;


  });

  // it('should get subjects, getSubjects()', () => {
  //   let spy = spyOn(component.subjectsService.getSubjects(), 'subscribe')
  //   component.getSubjects();
  //   expect(component.getSubjects()).toHaveBeenCalled;
  //   expect(component.subjectsService.getSubjects()).toHaveBeenCalled;
  // });

  // it('should get type subject, typeSubject', () => {
  //   expect(component.typeSubject).toBeDefined();
  //   expect(component.typeSubject).toBeTruthy();
  //   component.typeSubject();
  //   expect(component.subjectId).toBeDefined;
  //   expect(component.subjectId).not.toBeNaN;
  //   expect(component.subjectId).not.toBeNull;
  // });

  it('should add "is-valid" class to input element if it is valid', () => {
    // arrange
    const inputName = 'name';
    const inputElement = document.createElement('input');
    inputElement.id = inputName;
    component.noteForm.setValue({
      name: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      career: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      creator: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      subject: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      content: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      //calification: 'askdjaskljdhsklajdsaasdasasdas',
      attached: 'aaaaaaaaaaaaaaaaaaaaaaaa',
      category: 'aaaaaaaaaaaaaaaaaaaaaaaa'
      //comments: []
  })
    //spyOn(component.noteForm.get(inputName), 'valid').and.returnValue(true);

    // act
    component.CheckValidator(inputName);

    // assert
    expect(document.getElementById(inputName)?.classList).toContain('is-valid');
  });

  it('should get user data and set the user name', () => {
    const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
    spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
    spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);
    spyOn(mockUsersService, 'getUser').and.returnValue(of({ name: 'test', mail: 'test', password: '123', legajo: '123', notes: [mockNote]}));
    component.getUserData();
    expect(component.userData).not.toBeNull();
    //httpMock.match('api/users/'); 
  });

  it('should delete filestack file and display success message', fakeAsync(() => {
    const note: Note = {
      name: 'Test note',
      career: 'Test career',
      creator: 'testUser',
      subject: 'Test subject',
      content: 'Test content',
      calification: ['10'],
      attached: 'https://cdn.filestackcontent.com/filestack-file-id',
      category: ['Test category'],
      comments: []
    };
    component.note = note;
    filestackService = jasmine.createSpyObj('FilestackService', ['upload']);

    spyOn(component.toastr, 'success');
    spyOn(component.toastr, 'error');
    spyOn(component.filestackService, 'remove').and.returnValue(of({}));

    component.deleteFileStack();

    expect(component.toastr.success).toHaveBeenCalledWith('Archivo eliminado con exito.');
    expect(component.toastr.error).not.toHaveBeenCalled();
    //expect(component.enableUp).toHaveBeenCalled();
  }));

  it('should display error message if filestack file is not found', () => {
    const note: Note = {
      name: 'Test note',
      career: 'Test career',
      creator: 'testUser',
      subject: 'Test subject',
      content: 'Test content',
      calification: ['10'],
      attached: 'https://cdn.filestackcontent.com/filestack-file-id',
      category: ['Test category'],
      comments: []
    };
    component.note = note;

    spyOn(component.toastr, 'success');
    spyOn(component.toastr, 'error');

    component.deleteFileStack();

    expect(component.toastr.success).not.toHaveBeenCalled();
  });

  it('should set subjectsService.subjects when getSubjects() returns data', () => {
    const mockResponse = [
      { name: 'Subject 1', professor: 'Professor 1'},
      { name: 'Subject 2', professor: 'Professor 2'},
    ];

    const spy = spyOn(component.subjectsService, 'getSubjects').and.returnValue(of(mockResponse));
    component.getSubjects();

    expect(spy).toHaveBeenCalled();
    expect(component.subjectsService.subjects).toEqual(mockResponse);
  });

  it('should handle error when getSubjects() returns an error', () => {
    const spy = spyOn(component.subjectsService, 'getSubjects').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.getSubjects();

    expect(spy).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

});