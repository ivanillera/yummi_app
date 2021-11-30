import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApunteComponent } from './apunte.component';

describe('ApunteComponent', () => {
  let component: ApunteComponent;
  let fixture: ComponentFixture<ApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApunteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
