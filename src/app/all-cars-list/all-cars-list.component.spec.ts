import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCarsListComponent } from './all-cars-list.component';

describe('AllCarsListComponent', () => {
  let component: AllCarsListComponent;
  let fixture: ComponentFixture<AllCarsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCarsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
