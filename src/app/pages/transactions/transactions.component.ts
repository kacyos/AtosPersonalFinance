import { Component } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import {
  fomatTypeTransactionForAPI,
  fomatTypeTransactionForView,
} from 'src/app/utils/formatTypeTransaction';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  transactions: ITransaction[] = [];
  transactionForEditing?: ITransaction;
  toast!: {
    type: string;
    message: string;
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getAllTransactions();
    this.openToast('success', 'Transação criada com sucesso!');
  }

  openToast(type: string, message: string) {
    const toast = document.querySelectorAll('.toast');

    this.toast = {
      type,
      message,
    };

    toast.forEach((element) => {
      const toastBootstrap = Toast.getOrCreateInstance(element, {
        animation: true,
        autohide: true,
        delay: 3000,
      });
      toastBootstrap.show();
    });
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

  setTransactionEdit(transaction: ITransaction) {
    this.transactionForEditing = transaction;
  }

  updateTransaction(transaction: ITransaction) {
    this.transactionService
      .patchUpdateTransaction({
        ...transaction,
        type: fomatTypeTransactionForAPI(transaction.type),
      })
      .subscribe((transacrionUpdated) => {
        const type = fomatTypeTransactionForView(transacrionUpdated.type);
        this.transactions.unshift({
          ...transacrionUpdated,
          type,
        });
      });
  }

  createNewTransaction(transaction: ITransaction) {
    this.transactions.unshift({
      ...transaction,
      type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
    });
  }

  deleteTransaction() {
    this.transactionService
      .deleteTransaction(this.transactionForEditing?.id || 0)
      .subscribe((response) => {
        if (response?.status === 204) {
          this.transactions = this.transactions.filter(
            (transaction) => transaction.id !== this.transactionForEditing?.id
          );
        } else {
          console.log('Erro ao excluir transação');
        }
      });
  }
}
