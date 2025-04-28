import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecideurComponent } from './add-decideur.component';

describe('AddDecideurComponent', () => {
  let component: AddDecideurComponent;
  let fixture: ComponentFixture<AddDecideurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDecideurComponent]
    });
    fixture = TestBed.createComponent(AddDecideurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
