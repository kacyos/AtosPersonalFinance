import { Component } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import {
  fomatTypeTransactionForAPI,
  fomatTypeTransactionForView,
} from 'src/app/utils/formatTypeTransaction';
import { Toast } from 'bootstrap';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  transactions: ITransaction[] = [];
  transactionForEditing?: ITransaction;
  toast = {
    type: '',
    message: '',
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getTransactionsToday();
  }

  openToast(type: string, message: string) {
    this.toast.type = type;
    this.toast.message = message;

    const toast = document.querySelectorAll('.toast');

    toast.forEach((element) => {
      const toastBootstrap = Toast.getOrCreateInstance(element, {
        animation: true,
        autohide: true,
        delay: 3000,
      });
      toastBootstrap.show();
    });
  }

  getTransactionsToday() {
    this.transactionService.getModifiedToday().subscribe((transactions) => {
      console.log(transactions);
      this.transactions = transactions.map((transaction) => {
        return {
          ...transaction,
          type: fomatTypeTransactionForView(transaction.type),
        };
      });
    });
  }

  searchTransaction(transactionSearch: ITransaction) {
    const emptySearch = Object.values(transactionSearch).every(
      (value) => !value
    );

    if (emptySearch) {
      this.openToast('danger', 'Preencha o tipo, categoria, valor ou data.');
      return;
    }

    this.transactionService
      .getFilterTransaction({
        initial_date: DateConverter.ConvetDateInput(transactionSearch?.date),
        final_date: DateConverter.ConvetDateInput(transactionSearch?.date),
        transaction_type: transactionSearch?.type,
        value: transactionSearch.value?.toString(),
        category_id: transactionSearch?.categoryId?.toString(),
      })
      .subscribe((transactions) => {
        this.transactions = transactions.map((transaction) => {
          return {
            ...transaction,
            type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
          };
        });
      });
  }

  setTransactionEdit(transaction: ITransaction) {
    this.transactionForEditing = transaction;
  }

  createNewTransaction(transaction: ITransaction) {
    this.transactionService
      .postCreateTransaction(transaction)
      .subscribe((t) => {
        this.getTransactionsToday();
        this.openToast('success', 'Transação criada com sucesso!');
      });
  }

  updateTransaction(transaction: ITransaction) {
    this.transactionService
      .patchUpdateTransaction({
        ...transaction,
        type: fomatTypeTransactionForAPI(transaction.type),
      })
      .subscribe(() => {
        this.getTransactionsToday();
        this.openToast('success', 'Transação atualizada com sucesso!');
      });
  }

  deleteTransaction() {
    this.transactionService
      .deleteTransaction(this.transactionForEditing?.id || 0)
      .subscribe(() => {
        this.transactions = this.transactions.filter(
          (transaction) => transaction.id !== this.transactionForEditing?.id
        );
        this.openToast('success', 'Transação deletada com sucesso!');
      });
  }
}
