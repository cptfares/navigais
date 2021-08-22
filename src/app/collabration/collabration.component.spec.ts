import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabrationComponent } from './collabration.component';

describe('CollabrationComponent', () => {
  let component: CollabrationComponent;
  let fixture: ComponentFixture<CollabrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
