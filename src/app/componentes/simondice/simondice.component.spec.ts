import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimondiceComponent } from './simondice.component';

describe('SimondiceComponent', () => {
  let component: SimondiceComponent;
  let fixture: ComponentFixture<SimondiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimondiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimondiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
