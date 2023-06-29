import { Component, Input } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-modal-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class ModalEditTransactionComponent {
  @Input()
  transactionEdit?: ITransaction;

  constructor() {}

  ngOnInit(): void {
    console.log({ tyep: this.transactionEdit });
  }
}
