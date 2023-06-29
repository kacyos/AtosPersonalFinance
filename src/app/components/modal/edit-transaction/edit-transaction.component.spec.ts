import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditTransactionComponent } from './edit-transaction.component';

describe('EditTransactionComponent', () => {
  let component: ModalEditTransactionComponent;
  let fixture: ComponentFixture<ModalEditTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditTransactionComponent],
    });
    fixture = TestBed.createComponent(ModalEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
