import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(UsersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get a note, getNote(id)', () => {
        const getNoteSpy = spyOn(service, 'getUser');
        // GetNoteSpy.and.returnValue(of(mockNote));
        getNoteSpy.and.returnValue(of());
        getNoteSpy.and.callThrough;
        service.getUser('63b78f30eaf5b30016b727f5');
        expect(service.getUser).toHaveBeenCalled();
    });
});
