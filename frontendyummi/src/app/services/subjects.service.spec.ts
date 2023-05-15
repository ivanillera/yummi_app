import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubjectsService } from './subjects.service';

describe('SubjectsService', () => {
    let service: SubjectsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule]
        });
        service = TestBed.inject(SubjectsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
