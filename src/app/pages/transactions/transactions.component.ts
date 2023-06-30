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

  handleEdit(transaction: ITransaction) {
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

  deleteTransaction(transaction_id: number) {
    this.transactionService
      .deleteTransaction(transaction_id)
      .subscribe((response) => {
        if (response?.status === 204) {
          this.transactions = this.transactions.filter(
            (transaction) => transaction.id !== transaction_id
          );
          this.showToastSuccess('Transação excluída com sucesso!');
        } else {
          console.log('Erro ao excluir transação');
        }
      });
  }
}
