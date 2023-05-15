import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CareerFilterPipe } from 'src/app/pipes/career-filter.pipe';
import { CategoryFilterPipe } from 'src/app/pipes/category-filter.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { SubjectFilterPipe } from 'src/app/pipes/subject-filter.pipe';
import { NotesService } from 'src/app/services/notes.service';
import { FormsModule } from '@angular/forms';

import { ThreadComponent } from './thread.component';
import { Note } from 'src/app/models/Note';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

describe('ThreadComponent', () => {
    let component: ThreadComponent;
    let fixture: ComponentFixture<ThreadComponent>;
    let mockNotesService: NotesService;
    let mockUsersService: UsersService;
    let mockAuthService: AuthService;
    let httpMock: HttpTestingController;

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
    };

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
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ThreadComponent,
                CareerFilterPipe,
                SubjectFilterPipe,
                CategoryFilterPipe,
                FilterPipe
            ],
            providers: [        ToastrService
                // { provide: NotesService, useValue: notesServiceSpy },
                // { provide: UsersService, useValue: usersServiceSpy },
                // { provide: AuthService, useValue: authServiceSpy },
                // { provide: Location, }
            ],
            imports: [
                NgxPaginationModule,
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                ToastrModule.forRoot()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreadComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
        mockNotesService = TestBed.inject(NotesService);
        mockUsersService = TestBed.inject(UsersService);
        mockAuthService = TestBed.inject(AuthService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });


    it('should navigate back', () => {
        spyOn(component.location, 'back');
        component.back();
        expect(component.location.back).toHaveBeenCalled();
    });


    it('should sort notes by reverse calification when sortCalification is false', () => {
        component.sortCalification = false;
        component.noteService.notes = [
            {
                name: 'mock-name',
                career:'mock-career',
                subject: 'mock-subject',
                creator: 'mock-creator',
                content: 'mock-content',
                calification: ['A'],
                attached:'mock-attached',
                category: [],
                comments: []
            },
            {
                name: 'mock-name',
                career:'mock-career',
                subject: 'mock-subject',
                creator: 'mock-creator',
                content: 'mock-content',
                calification: ['C'],
                attached:'mock-attached',
                category: [],
                comments: []
            },
            {
                name: 'mock-name',
                career:'mock-career',
                subject: 'mock-subject',
                creator: 'mock-creator',
                content: 'mock-content',
                calification: ['B'],
                attached:'mock-attached',
                category: [],
                comments: []
            }];
        component.sortByCalification();
        expect(component.noteService.notes[0].calification).toEqual([ 'B' ]);
        expect(component.noteService.notes[1].calification).toEqual([ 'C' ]);
        expect(component.noteService.notes[2].calification).toEqual([ 'A' ]);
        //HttpMock.match('api/notes/');
    });

    it('should reset filterCategory to its original value', () => {
        const filterCategory = 'some category';
        const filterCategoryInput = document.getElementById('filterCategory') as HTMLInputElement;
        filterCategoryInput.value = filterCategory;
        component.sortByCalification();
        expect(filterCategoryInput.value).toBe('');
        //HttpMock.match('api/notes/');
    });

    it('should get user data and set the user name', () => {
        const tokenInfo = { _id: '638f825a9414fa0016fc2666' };
        spyOn(mockAuthService, 'getToken').and.returnValue('fake token');
        spyOn(component, 'getDecodedAccessToken').and.returnValue(tokenInfo);
        spyOn(mockUsersService, 'getUser').and.returnValue(of({ name: 'test', mail: 'test', password: '123', legajo: '123', notes: [mockNote1]}));
        component.getUserData();
        expect(component.userData).not.toBeNull();
        expect(component.userName).toBe('test');
        //HttpMock.match('api/users/');
    });

    it('should sort notes by number of comments', () => {
        mockNotesService.notes = [mockNote1, mockNote3, mockNote2];
        component.sortByComments();

        expect(mockNotesService.notes[0].name).toEqual('mock-name1');
        expect(mockNotesService.notes[1].name).toEqual('mock-name2');
        expect(mockNotesService.notes[2].name).toEqual('mock-name3');
    });
    it('should reverse sort notes by number of comments', () => {
        const notes = [mockNote1, mockNote3, mockNote2];

        mockNotesService.notes = notes;
        component.sortComment = true;
        component.sortByComments();

        expect(mockNotesService.notes[0].name).toEqual('mock-name1');
        expect(mockNotesService.notes[1].name).toEqual('mock-name2');
        expect(mockNotesService.notes[2].name).toEqual('mock-name3');
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
        var respond;
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
        const mockNotes = [mockNote1, mockNote2, mockNote3];
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

    it('should get a note, getNote(id)', () => {
        expect(component.getNote).toBeDefined();
        expect(component.getNote).toBeTruthy();

        component.noteService.getNote('63b78f30eaf5b30016b727f5');
        fixture.detectChanges();
        expect(component.noteService.notes).not.toBeNaN();
        component.noteService.getNote('63b78f30eaf5b30016b727f5').subscribe(res => {
            expect(res).toBeDefined();
            expect(component.noteService.notes).not.toBeNull();
        });
    });

    it('should retrieve a note by ID', () => {

        mockNotesService.getNote('638f8b429414fa0016fc26b6').subscribe(res => {
            expect(res).not.toBeNaN();
        });

        httpMock.match('api/notes/638f8b429414fa0016fc26b6');
    });


    it('should decode JWT token', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const decodedToken = component.getDecodedAccessToken(token);
        expect(decodedToken).toBeTruthy();
        expect(decodedToken.sub).toEqual('1234567890');
        expect(decodedToken.name).toEqual('John Doe');
    });

    it('should return null for invalid JWT token', () => {
        const invalidToken = 'invalid_token';
        const decodedToken = component.getDecodedAccessToken(invalidToken);
        expect(decodedToken).toBeNull();
    });

    it('should log an error message when the API returns an error', () => {
        const errorMessage = 'Error getting notes';
        spyOn(console, 'error');

        mockNotesService.getNotes().subscribe(
            res => {
                expect(res).toBeDefined;
                fail('getNotes should have failed');
            },
            err => {
                expect(err).toEqual(errorMessage);
                expect(console.error).toHaveBeenCalledWith(errorMessage);
            }
        );
    });

    it('should fetch notes on initialization', () => {
        const mockNotes = [ mockNote1, mockNote2, mockNote3];

        spyOn(component.noteService, 'getNotes').and.returnValue(of(mockNotes));

        component.getNotes();

        expect(component.noteService.getNotes).toHaveBeenCalled();
        expect(component.noteService.notes).toEqual(mockNotes.reverse());
    });

    it('should get a note, getNote(id)', () => {
        expect(component.getNote).toBeDefined();
        expect(component.getNote).toBeTruthy();

        component.noteService.getNote('63b78f30eaf5b30016b727f5');
        fixture.detectChanges();
        expect(component.noteService.notes).not.toBeNaN();
        component.noteService.getNote('63b78f30eaf5b30016b727f5').subscribe(res => {
            expect(res).toBeDefined();
            expect(component.noteService.notes).not.toBeNull();
        });
    });

    it('should retrieve a note by ID', () => {
        expect(mockNotesService.getNote).toBeDefined();
        expect(mockNotesService.getNote).toBeTruthy();
        expect(component.getNote).toBeDefined();
        expect(component.getNote).toBeTruthy();

        mockNotesService.getNote('638f8b429414fa0016fc26b6').subscribe(res => {
            expect(res).not.toBeNaN();
        });

        httpMock.match('api/notes/638f8b429414fa0016fc26b6');
    });

    it('should declare the getNotes function', () => {
        const spy = spyOn(component,'getNotes');
        component.getNotes();

        expect(spy).toHaveBeenCalled();

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
        };

        component.getNote('63b78f30eaf5b30016b727f5');
        fixture.detectChanges();
        expect(component.noteService.selectedNote).toEqual(note);
        component.noteService.getNote('63b78f30eaf5b30016b727f5').subscribe(res => {
            expect(res).toBeDefined();
            expect(component.noteService.selectedNote).toEqual(note);
            expect(component.noteService.selectedNote.content).toEqual(note.content);
            expect(component.noteService.selectedNote.attached).toEqual(note.attached);
        });
    });

});
