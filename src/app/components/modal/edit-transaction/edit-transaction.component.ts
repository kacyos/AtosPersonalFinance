import { Component, Input } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent {
  @Input()
  transactionEdit?: ITransaction;

  constructor() {}

  ngOnInit(): void {
    console.log({ tyep: this.transactionEdit });
  }
}
