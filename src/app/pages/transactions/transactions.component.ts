import { Component } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { Toast, Alert } from 'bootstrap';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  transactions: ITransaction[] = [];
  transactionEdit?: ITransaction;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe((transactions) => {
      transactions.forEach((transaction) => {
        this.transactions.push({
          ...transaction,
          type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
        });
      });
    });
  }

  ngInitView() {
    const alert = document.getElementById('alert') || '';
    const alertInstance = Alert.getOrCreateInstance(alert);
    alertInstance.close();
  }

  handleEdit(transaction: ITransaction) {
    this.transactionEdit = transaction;
  }

  showToastSuccess() {
    const toastLiveExample = document.getElementById('toast-success');
    const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample || '');
    toastBootstrap.show();
  }

  editTransaction(transaction: string) {
    console.log(transaction);
  }

  createNewTransaction(transaction: ITransaction) {
    this.transactions.unshift({
      ...transaction,
      type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
    });
    this.showToastSuccess();
  }
}
