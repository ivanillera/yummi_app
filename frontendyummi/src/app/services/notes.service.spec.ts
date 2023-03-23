import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotesService } from './notes.service';
import { Note } from '../models/Note';
import { Comment } from '../models/Comment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FilestackModule } from '@filestack/angular';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;
  let toastrMock : ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FilestackModule
      ],
      declarations: []
    }).compileComponents();
    service = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
    toastrMock = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    //Despues de cada prueba revisar si quedan peticiones pendientes
    //After each test, check if there are any pending requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeDefined();
  });

  it('should get notes, getNotes()', () => {
    expect(service.getNotes).toBeDefined();    
    expect(service.getNotes).toBeTruthy();
    var respond
    service.getNotes().subscribe(result =>{
      respond = result;
      expect(respond).toBeTruthy;
      expect(service.getNotes);
      expect(service.notes);
      expect(service.notes.length).toBe(0);
    });
  

  
    httpMock.match('api/notes/');  
  });

  it('should create a note, createNote(note:Note)', () => {
    expect(service.createNote).toBeDefined();    
    expect(service.createNote).toBeTruthy();
    let note : Note = {
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

    service.createNote(note).subscribe((res) => {
      expect(res).toBe(note);
    })

    const req = httpMock.expectOne('api/notes/');
    req.flush(note);
    
  });

  it('should comment a note, commentNote(note:Note, id:string, comment: Comment):Observable<any>', () => {
    expect(service.commentNote).toBeDefined();
    expect(service.commentNote).toBeTruthy();
    let comment : Comment = {
      commentCreator : 'Test',
      content : 'Test',
      date : '10/10/2022'
    }
    let note : Note = {
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
    
    service.commentNote(note,'id',comment).subscribe((res) => {
      expect(res).toBe(note);
    })

    const req = httpMock.expectOne('api/notes/id');
    req.flush(note);
  });

  it('should update a note, updateNote(note:Note, id:string)', () => {
    expect(service.updateNote).toBeDefined();
    expect(service.updateNote).toBeTruthy();
    let note : Note = {
      name: 'mod',
      career:'',
      subject: '',
      creator: '',
      content: '',
      calification: [],
      attached:'',
      category: [],
      comments: []
    }
    service.updateNote(note,'638f8b429414fa0016fc26b6').subscribe((res) => {
      expect(res).not.toBe(NaN);
    })

    const req = httpMock.expectOne('api/notes/638f8b429414fa0016fc26b6');
    req.flush(note);
  });

  it('should add a like, agregarLike(note:Note, id:string, userId: string)', () => {
    expect(service.agregarLike).toBeDefined();
    expect(service.agregarLike).toBeTruthy();

    let note : Note = {
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
    
    service.agregarLike(note,'638f8b429414fa0016fc26b6','1').subscribe((res) => {
      expect(res).not.toBe(NaN);
    })

    const req = httpMock.expectOne('api/notes/638f8b429414fa0016fc26b6');
    req.flush(note);
  });

  it('should remove a like, removerLike(note:Note, id:string, userId: string)', () => {
    expect(service.removerLike).toBeDefined();
    expect(service.removerLike).toBeTruthy();
    let note : Note = {
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
    service.removerLike(note,'638f8b429414fa0016fc26b6','1').subscribe((res) => {
      expect(res).not.toBe(NaN);
    })

    const req = httpMock.expectOne('api/notes/638f8b429414fa0016fc26b6');
    req.flush(note);
  });

  it('should delete a note, deleteNote(id: string)', () => {
    expect(service.deleteNote).toBeDefined();
    expect(service.deleteNote).toBeTruthy();


    service.deleteNote('638f8b429414fa0016fc26b6').subscribe((res) => {
      expect(res).not.toBe(NaN);
    })

    const req = httpMock.expectOne('api/notes/638f8b429414fa0016fc26b6');
    req.flush({status: 'Note Deleted'});
  });

  it('should upload a file,  upload(file:any)', () => {
    expect(service.upload).toBeDefined();
    expect(service.upload).toBeTruthy();
    const obj = new Blob;

    var file = new File([""], "filename", { type: 'text/html' });

    service.upload(file).subscribe((err) => {
      expect(err).toThrowError();
    })

    const req = httpMock.expectOne('https://file.io');


  });

  it('should upload a big file,  upload(file:any)', () => {
    expect(service.upload).toBeDefined();
    expect(service.upload).toBeTruthy();
    const obj = new Blob;

    const file = new File([""], 'darthvader.png');
      Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 })
      console.log( file.size ); // 1048577

    service.upload(file).subscribe((err) => {
      expect(err).toThrowError();
      expect(toastrMock.error).toHaveBeenCalled;
    })

    const req = httpMock.expectOne('https://file.io');

  });

  it('should sort comments in descending order by date', () => {
    const mockNote1:Note = {
      name: 'mock-name1',
      career:'mock-career',
      subject: 'mock-subject',
      creator: 'mock-creator',
      content: 'mock-content',
      calification: ['A'],
      attached:'mock-attached',
      category: [],
      comments: [
        { commentCreator: 'mockComment3', content: 'mock', date:'2023-03-20'}, 
        { commentCreator: 'mockComment2', content: 'mock', date:'2023-03-21'},
        { commentCreator: 'mockComment1', content: 'mock', date:'2023-03-22'}
      ]
    }

    const expectedComments = [
      { commentCreator: 'Test Author', date: '2023-03-23', content: 'Test comment'},
      { commentCreator: 'mockComment1', content: 'mock', date:'2023-03-22'},
      { commentCreator: 'mockComment2', content: 'mock', date:'2023-03-21'},
      { commentCreator: 'mockComment3', content: 'mock', date:'2023-03-20'}
    ];
    const id = '1';
    
    const comment: Comment = {
      commentCreator: 'Test Author',
      date: '2023-03-23',
      content: 'Test comment'
    };

    service.commentNote(mockNote1, id, comment).subscribe(result => {
      expect(mockNote1.comments).toEqual(expectedComments);
    });

    const req = httpMock.expectOne('api/notes/1');
    req.flush(mockNote1);

  });

});
