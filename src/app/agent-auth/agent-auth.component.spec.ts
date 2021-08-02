import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAuthComponent } from './agent-auth.component';

describe('AgentAuthComponent', () => {
  let component: AgentAuthComponent;
  let fixture: ComponentFixture<AgentAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
