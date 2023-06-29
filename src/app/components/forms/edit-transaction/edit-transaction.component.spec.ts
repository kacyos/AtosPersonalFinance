import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditTransactionComponent } from './edit-transaction.component';

describe('EditTransactionComponent', () => {
  let component: FormEditTransactionComponent;
  let fixture: ComponentFixture<FormEditTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditTransactionComponent],
    });
    fixture = TestBed.createComponent(FormEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
