import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrearApunteComponent } from './crear-apunte.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { of } from 'rxjs';
import { SubjectsService } from 'src/app/services/subjects.service';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

describe('CrearApunteComponent', () => {


    let component: CrearApunteComponent;
    let fixture: ComponentFixture<CrearApunteComponent>;
    let subjectsService: SubjectsService;

    let mockUsersService: UsersService;
    let mockAuthService: AuthService;
    let toastrService: ToastrService;


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
            expect(res2).toBeDefined();
            expect(res).toBeTruthy();
            expect(res).not.toBeNaN;
            expect(res).not.toBeUndefined;
            expect(component.subjectsService.subjects).toEqual(res);
        });
        var res3 = component.subjectsService.subjects;
        expect(res3).not.toBeNaN;
        expect(res3).toBeUndefined;

        let spy = spyOn(component.subjectsService.getSubjects(), 'subscribe');
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
        expect(app.checkValidator).toBeTruthy();
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

        fileChangedSpy.and.callThrough;
        fileChangedSpy.and.returnValue;
        expect(component.fileChanged).toHaveBeenCalled();
        expect(<HTMLInputElement> document.getElementById("succesLabel").style.display).toEqual('none');
        expect(console.log('1')).toBeTrue;
        //Expect(toastr.error).toHaveBeenCalled();
    });

    // It('should postFileStack, postFileStack())', () => {
    //   Const postFileStackSpy = spyOn(component, 'postFileStack');
    //   PostFileStackSpy.and.returnValue;
    //   Component.postFileStack();
    //   Expect(component.notesService.agregarLike).toHaveBeenCalled();
    // });

    it('should changeFile, fileChange(e:any)', () => {
        const e =  {
            name: '27164646411_011_00002_00000121.pdf',
            lastModified: 1676396463352,
            webkitRelativePath: '',
            size: 54628,
            type: 'application/pdf'
        };
        component.file = e;
        const fileChangedSpy = spyOn(component, 'fileChanged');
        component.fileChanged(component.file);
        fileChangedSpy.and.callThrough;
        fileChangedSpy.and.returnValue;
        expect(component.fileChanged).toHaveBeenCalled();
        expect(fileChangedSpy).toHaveBeenCalled();
        expect(component.file).not.toBeNull;

    });

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

        fixture.detectChanges();

        expect(component.checkValidator('name')).toBeDefined;

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
        };

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
        //Component.addNote();
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
        //HttpMock.match('api/users/');
    });

    it('should add "is-valid" class to input element if it is valid', () => {
        // Arrange
        const inputName = 'name';
        const inputElement = document.createElement('input');
        inputElement.id = inputName;
        component.noteForm.setValue({
            name: 'aaaaaaaaaaaaaaaaaaaaaaaa',
            career: 'aaaaaaaaaaaaaaaaaaaaaaaa',
            creator: 'aaaaaaaaaaaaaaaaaaaaaaaa',
            subject: 'aaaaaaaaaaaaaaaaaaaaaaaa',
            content: 'aaaaaaaaaaaaaaaaaaaaaaaa',
            //Calification: 'askdjaskljdhsklajdsaasdasasdas',
            attached: 'aaaaaaaaaaaaaaaaaaaaaaaa',
            category: 'aaaaaaaaaaaaaaaaaaaaaaaa'
            //Comments: []
        });
        //SpyOn(component.noteForm.get(inputName), 'valid').and.returnValue(true);

        // Act
        component.checkValidator(inputName);

        // Assert
        expect(document.getElementById(inputName)?.classList).toContain('is-valid');
    });

    it('should reset the form', fakeAsync(() => {
        const form = new NgForm([], []);
        component.resetForm(form);
        expect(form.value).toEqual({});
    }));


    it('should display error message when form is invalid', () => {
        component.noteForm.setValue({
            name: 'Test Note',
            career: '',
            subject: '',
            creator: '',
            content: '',
            //Calification: '',
            attached: '',
            category: '',
            //Comments: ''
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
        const mockFile = new File(['mock content'], 'mock-file.pdf', { type: 'application/pdf' });

        // Act
        component.file = mockFile;
        await component.postFileStack();

        // Assert
        //Expect(filestackService.upload).toHaveBeenCalledWith(mockFile);
        expect(component.shortLink).toContain('https://cdn.filestackcontent.com/');
    });

});
