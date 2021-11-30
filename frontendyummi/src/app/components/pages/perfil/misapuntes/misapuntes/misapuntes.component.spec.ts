import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisapuntesComponent } from './misapuntes.component';

describe('MisapuntesComponent', () => {
  let component: MisapuntesComponent;
  let fixture: ComponentFixture<MisapuntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisapuntesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisapuntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
