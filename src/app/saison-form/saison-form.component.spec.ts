import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisonFormComponent } from './saison-form.component';

describe('SaisonFormComponent', () => {
  let component: SaisonFormComponent;
  let fixture: ComponentFixture<SaisonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaisonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaisonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
