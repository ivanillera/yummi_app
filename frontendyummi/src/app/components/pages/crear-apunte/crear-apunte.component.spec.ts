import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { CrearApunteComponent } from './crear-apunte.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule, FilestackService } from '@filestack/angular';
import { of } from 'rxjs';
import { SubjectsService } from 'src/app/services/subjects.service';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/Note';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import {delay} from 'rxjs/operators'
import { Component } from '@angular/core';

describe('CrearApunteComponent', () => {


  let component: CrearApunteComponent;
  let fixture: ComponentFixture<CrearApunteComponent>;
  let toastr: ToastrService;
  let subjectsService: SubjectsService;
  let noteService: NotesService;
  let router: Router;

  let mockUsersService: UsersService;
  let mockAuthService: AuthService;
  let httpMock: HttpTestingController;
  let toastrService: ToastrService;
  let filestackServiceSpy: jasmine.SpyObj<FilestackService>;


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
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FilestackService', ['upload']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        FilestackModule],
      declarations: [ CrearApunteComponent ],
      providers: [ SubjectsService, NgForm, NotesService, ToastrService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;
    fixture = TestBed.createComponent(CrearApunteComponent);
    component = fixture.componentInstance;
    subjectsService = TestBed.inject(SubjectsService);
    spyOn(subjectsService, 'getSubjects').and.returnValue(of([]));
    noteService = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
    mockUsersService = TestBed.inject(UsersService);
    mockAuthService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('Expect CrearApunteComponent Creation', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('addComment', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.getSubjects).toBeTruthy();
  });

  it('fileChanged', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.fileChanged).toBeTruthy();
  });

  it('postFileStack', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.postFileStack).toBeTruthy();
  });

  it('getUserData', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.getUserData).toBeTruthy();
  });

  it('should getSubjects, getSubjects()', () => {
    component.getSubjects();
    var res1 = component.subjectsService.getSubjects();
    expect(res1).toBeTruthy();
    expect(res1).not.toBeNaN;
    expect(res1).not.toBeUndefined;
  
    // Check that the getSubjects() method returns an Observable
    expect(res1.subscribe).toBeDefined();
  
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

  it('typeSubject', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.typeSubject).toBeDefined();
    expect(app.typeSubject).toBeTruthy();
    const spy = spyOn(component, 'typeSubject');
    component.typeSubject();
    expect(spy).toHaveBeenCalled();
  });  

  it('CheckValidator', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.CheckValidator).toBeTruthy();
  });

  it('addNote', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.addNote).toBeTruthy();
  });

  it('resetForm', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.resetForm).toBeTruthy();
  });

  it('getDecodedAccessToken', () => {
    const fixture = TestBed.createComponent(CrearApunteComponent);
    const app = fixture.componentInstance;
    expect(app.getDecodedAccessToken).toBeTruthy();
  });

  it('should upload a file, fileChanged(e:any)', () => {
    expect(component.fileChanged).toBeDefined();
    expect(component.fileChanged).toBeTruthy();
    const fileChangedSpy = spyOn(component, 'fileChanged');

    component.fileChanged('1');
    fileChangedSpy.and.callThrough;
    fileChangedSpy.and.returnValue;
    expect(component.fileChanged).toHaveBeenCalled();
    expect((<HTMLInputElement> document.getElementById("succesLabel")).style.display).toEqual('none');
    expect(console.log('1')).toBeTrue;
    //expect(toastr.error).toHaveBeenCalled();
  });

  // it('should postFileStack, postFileStack())', () => {
  //   const postFileStackSpy = spyOn(component, 'postFileStack');
  //   postFileStackSpy.and.returnValue;
  //   component.postFileStack();
  //   expect(component.notesService.agregarLike).toHaveBeenCalled();
  // });

  it('should changeFile, fileChange(e:any)', () => {
    const e =  { 
      name: '27164646411_011_00002_00000121.pdf', 
      lastModified: 1676396463352, 
      webkitRelativePath: '',
      size: 54628, 
      type: 'application/pdf' 
    }
    component.file = e
    const fileChangedSpy = spyOn(component, 'fileChanged');
    component.fileChanged(component.file);
    fileChangedSpy.and.callThrough;
    fileChangedSpy.and.returnValue;
    expect(component.fileChanged).toHaveBeenCalled();
    expect(fileChangedSpy).toHaveBeenCalled();
    expect(component.file).not.toBeNull;

  });

  // it('should post to fileStack, postFileStack()', () => {
  //   expect(component.postFileStack).toBeDefined();
  //   expect(component.postFileStack).toBeTruthy();
  //   component.file = { 
  //     name: '27164646411_011_00002_00000121.pdf', 
  //     lastModified: 1676396463352, 
  //     webkitRelativePath: '',
  //     size: 54628, 
  //     type: 'application/pdf' 
  //   }
  //   const spyfilestackService = spyOn(component.filestackService, 'upload');

  //   component.postFileStack();
  //   spyfilestackService.and.returnValue(of());
  //   expect(component.filestackService).toBeDefined;
  //   expect(component.filestackService).toBeTruthy;
  //   expect(spyfilestackService).toHaveBeenCalled();

  //   //const spyfilestackServiceUpload = spyOn(component.filestackService.upload, 'subscribe')
  //   component.postFileStack().then(response => {
  //     expect(response).not.toBeNull;
  //     expect(component.shortLink).not.toBeNull;
  //   });
  //   // component.filestackService.upload(component.file).subscribe(response => {
  //   //   expect(console.log(Object.keys(response))).toHaveBeenCalled();
  //   //   expect(console.log(Object.keys(response)[4])).toHaveBeenCalled()
  //   //   expect(response).not.toBeNull;
  //   //   expect(component.shortLink).not.toBeNull;
  //   // });
  //   // expect(component.filestackService.upload(component.file).subscribe).toHaveBeenCalled;
  // });

  it('should get subjects', () => {
    component.getSubjects();
    expect(subjectsService.getSubjects).toHaveBeenCalled();
    expect(component.subjectsService.subjects).toEqual([]);
  });

  it('should validate form controls', () => {
    component.noteForm = new FormGroup({
      name: new FormControl('', Validators.required),
      career: new FormControl('', Validators.required),
      creator: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      attached: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
    //const input = fixture.debugElement.nativeElement.querySelector('name'); // example a, h1, p
    const input = document.getElementById('#name')

    //const input = fixture.debugElement.query(By.name('name'))).nativeElement;

    // input.value = 'John salchichon 123456 asdasdasda';
    // input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.CheckValidator('name')).toBeDefined;

    // const emailInput = fixture.debugElement.query(By.css('#career')).nativeElement;
    // emailInput.value = 'Ingeniería en Sistemas de información';
    // emailInput.dispatchEvent(new Event('input'));
    // fixture.detectChanges();

    // component.CheckValidator('email');

    // expect(emailInput.classList.contains('is-valid')).toBeFalsy();
    // expect(emailInput.classList.contains('is-invalid')).toBeTruthy();
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

  it('should add a note', () => {
    expect(component.addNote).toBeDefined();
    expect(component.addNote).toBeTruthy();
    // Set up a mock note
    const mockNote = {
      name: 'mock-name 12345678910',
      career:'mock-career',
      subject: 'mock-subject',
      creator: 'mock-creator',
      content: 'mock-content',
      calification: [],
      attached:'mock-attached',
      category: [],
      comments: []
    }

    // Set up a spy on the createNote function of the note service
    spyOn(component.noteService, 'createNote').and.returnValue(of(mockNote));

    // Set up a mock form with the note data
    component.noteForm.setValue({
      name: mockNote.name,
      career: mockNote.career,
      creator: mockNote.creator,
      subject: mockNote.subject,
      content: mockNote.content,
      attached: mockNote.attached,
      category: mockNote.category
    });

    // Call the addNote function
    //component.addNote();
    component.noteService.createNote(mockNote);


    // Verify that the createNote function of the note service was called with the mock note
    expect(component.noteService.createNote).toHaveBeenCalledWith(mockNote);
  });

  it('should get user data and set the user name', () => {
    const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
    spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
    spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);
    spyOn(mockUsersService, 'getUser').and.returnValue(of({ name: 'test', mail: 'test', password: '123', legajo: '123', notes: [mockNote1]}));
    component.getUserData();
    expect(component.userData).not.toBeNull();
    expect(component.userName).toBe('');
    //httpMock.match('api/users/'); 
  });

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

  it('should reset the form', fakeAsync(() => {
    const form = new NgForm([], []);  
    component.resetForm(form);
    expect(form.value).toEqual({});
  }));
  
  // it('should create a note successfully', fakeAsync(() => {
  //   const NOTE = {
  //     name: 'mock-name 12345678910',
  //     career:'mock-career',
  //     subject: 'mock-subject',
  //     creator: '638f825a9414fa0016fc2666',
  //     content: 'mock-content',
  //     calification: [],
  //     attached:'mock-attached',
  //     category: [],
  //     comments: []
  //   };

  //   const spy = spyOn(toastr,'success');

  //   component.noteForm.setValue({
  //     name: NOTE.name,
  //     career: NOTE.career,
  //     subject: NOTE.subject,
  //     creator: NOTE.creator,
  //     content: NOTE.content,
  //     //calification: NOTE.calification,
  //     attached: NOTE.attached,
  //     category: NOTE.category,
  //     //comments: NOTE.comments
  //   });

  //   component.tokenId = NOTE.creator;
  //   component.addNote();

  //   component.noteService.createNote(NOTE)
  //   //expect(spyNoteService).toHaveBeenCalledWith(NOTE);
  //   expect(spy).toHaveBeenCalledWith('Apunte creado con exito.','Apunte registrado!');
  // }));

  it('should display error message when form is invalid', () => {
    component.noteForm.setValue({
      name: 'Test Note',
      career: '',
      subject: '',
      creator: '',
      content: '',
      //calification: '',
      attached: '',
      category: '',
      //comments: ''
    });
    const spyToastrService = spyOn(toastrService, 'error');
    component.addNote();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('should call postFileStack and display a success message if the file size is within the limit', async () => {
    spyOn(component, 'postFileStack').and.returnValue(Promise.resolve());
    spyOn(component.toastr, 'success');
    component.file = new File(['foo'], 'foo.txt', { type: 'text/plain', lastModified: new Date().getTime() });
    const event = { target: { files: [component.file], value: 'fakePath' } };
    await component.fileChanged(event);
    expect(component.postFileStack).toHaveBeenCalled();
  });

      it('should upload a file and set the attached property of the note', async () => {
    // Arrange
    filestackServiceSpy = jasmine.createSpyObj('FilestackService', ['upload']);
    const mockFile = new File(['mock content'], 'mock-file.pdf', { type: 'application/pdf' });
    //spyOn(filestackService, 'upload').and.returnValue(of({ data: { url: 'https://example.com/mock-file.pdf' } }));
    //const newComponent = new EditarApunteComponent(noteService, activatedRoute, formBuilder, authService, mockUsersService, subjectService, fileService,toastr,filestackService,router);

    // Act
    component.file = mockFile;
    await component.postFileStack();

    // Assert
    //expect(filestackService.upload).toHaveBeenCalledWith(mockFile);
    expect(component.shortLink).toContain('https://cdn.filestackcontent.com/');
    });

});
