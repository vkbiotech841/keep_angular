import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesdisplayComponent } from './notesdisplay.component';

describe('NotesdisplayComponent', () => {
  let component: NotesdisplayComponent;
  let fixture: ComponentFixture<NotesdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
