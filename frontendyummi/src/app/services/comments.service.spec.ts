import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommentsService } from './comments.service';
import { Comment } from '../models/Comment';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule]
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //Despues de cada prueba revisar si quedan peticiones pendientes
    //After each test, check if there are any pending requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get comments, getComments()', () => {
    
    let response:Comment[] = [];


    service.getComments().subscribe((res) => {
      expect(res).toEqual(response);
    })

    const req = httpMock.expectOne('api/comments/');
    req.flush(response);

  });

  it('should create comment, createComments()', () => {
    
    let comment:Comment = {
      commentCreator: 'mockComment',
      content: 'mock',
      date:''
    }

    service.createComment(comment).subscribe((res) => {
      expect(res).toBe(comment);
    })

    const req = httpMock.expectOne('api/comments/');
    req.flush(comment);

  });



});
