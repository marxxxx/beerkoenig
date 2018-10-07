import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerVoteComponent } from './beer-vote.component';

describe('BeerVoteComponent', () => {
  let component: BeerVoteComponent;
  let fixture: ComponentFixture<BeerVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
