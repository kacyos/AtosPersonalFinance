import { Component, Input } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-modal-edit-transaction',
  templateUrl: './modal-edit-transaction.component.html',
  styleUrls: ['./modal-edit-transaction.component.css'],
})
export class ModalEditTransactionComponent {
  @Input()
  transactionForEditing?: ITransaction;

  constructor() {}
}
