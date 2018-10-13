import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipentResultsComponent } from './participent-results.component';

describe('ParticipentResultsComponent', () => {
  let component: ParticipentResultsComponent;
  let fixture: ComponentFixture<ParticipentResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipentResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
