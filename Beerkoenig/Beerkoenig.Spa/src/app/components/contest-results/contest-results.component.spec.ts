import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestResultsComponent } from './contest-results.component';

describe('ContestResultsComponent', () => {
  let component: ContestResultsComponent;
  let fixture: ComponentFixture<ContestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
