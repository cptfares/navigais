import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EroorComponent } from './eroor.component';

describe('EroorComponent', () => {
  let component: EroorComponent;
  let fixture: ComponentFixture<EroorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EroorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EroorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
