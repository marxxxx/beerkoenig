import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeParticipentComponent } from './welcome-participent.component';

describe('WelcomeParticipentComponent', () => {
  let component: WelcomeParticipentComponent;
  let fixture: ComponentFixture<WelcomeParticipentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeParticipentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeParticipentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
