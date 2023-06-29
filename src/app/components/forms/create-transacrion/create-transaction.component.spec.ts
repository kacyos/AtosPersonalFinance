import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTransactionComponent } from './create-transaction.component';

describe('CreateTransactionComponent', () => {
  let component: FormCreateTransactionComponent;
  let fixture: ComponentFixture<FormCreateTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateTransactionComponent],
    });
    fixture = TestBed.createComponent(FormCreateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
