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
  toastMessage!: string;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getAllTransactions();
  }

  openToast() {
    const toast = document.querySelectorAll('.toast-error');
    toast.forEach((t) => {
      console.log(t);
      const toastBootstrap = Toast.getOrCreateInstance(t, {
        animation: true,
        autohide: false,
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

  showToastSuccess(message: string) {
    this.toastMessage = message;
    const toastSuccess = document.getElementById('toast-success');
    const toastBootstrap = Toast.getOrCreateInstance(toastSuccess || '');
    toastBootstrap.show();
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

        this.showToastSuccess('Transação atualizada com sucesso!');
      });
  }

  createNewTransaction(transaction: ITransaction) {
    this.transactions.unshift({
      ...transaction,
      type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
    });
    this.showToastSuccess('Transação criada com sucesso!');
  }

  deleteTransaction() {
    this.transactionService
      .deleteTransaction(this.transactionForEditing?.id || 0)
      .subscribe((response) => {
        if (response?.status === 204) {
          this.transactions = this.transactions.filter(
            (transaction) => transaction.id !== this.transactionForEditing?.id
          );
          this.showToastSuccess('Transação excluída com sucesso!');
        } else {
          console.log('Erro ao excluir transação');
        }
      });
  }
}
