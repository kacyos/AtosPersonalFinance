import { Component } from '@angular/core';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  transactions: ITransaction[] = [];
  categories: ICategory[] = [];

  newTransaction = {
    type: '',
    value: 0,
    date: '',
    categoryId: 0,
  };

  typeSelected = '';
  transactionSelected: ITransaction = {
    id: 0,
    type: '',
    value: 0,
    date: '',
    userId: 0,
    categoryId: 0,
  };

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe((transactions) => {
      transactions.forEach((transaction) => {
        this.transactions.push({
          ...transaction,
          type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
        });
      });
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    });
  }

  openModal(transaction: ITransaction) {
    this.transactionSelected = transaction;
    console.log(transaction);
  }
}
