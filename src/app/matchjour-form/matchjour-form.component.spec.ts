import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchjourFormComponent } from './matchjour-form.component';

describe('MatchjourFormComponent', () => {
  let component: MatchjourFormComponent;
  let fixture: ComponentFixture<MatchjourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchjourFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchjourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
