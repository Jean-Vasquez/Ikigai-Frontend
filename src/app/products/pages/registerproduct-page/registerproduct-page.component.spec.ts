import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterproductPageComponent } from './registerproduct-page.component';

describe('RegisterproductPageComponent', () => {
  let component: RegisterproductPageComponent;
  let fixture: ComponentFixture<RegisterproductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterproductPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterproductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
