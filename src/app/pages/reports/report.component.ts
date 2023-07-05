import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ArrayTransForm } from 'src/app/utils/arrayTransform';
import { DateConverter } from 'src/app/utils/date';
import { Collapse, Toast } from 'bootstrap';
import { fomatTypeTransactionForView } from 'src/app/utils/formatTypeTransaction';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportsComponent implements OnInit {
  form!: FormGroup;

  categories: ICategory[] = [];
  transactions: ITransaction[] = [];
  totalRevenues: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  toast = { type: '', message: '' };

  transactionsGroupByCategory: {
    categoryId: number;
    type: string;
    categoryName: string;
    total: number;
  }[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      transaction_type: new FormControl(''),
      categoryId: new FormControl(''),
      initial_date: new FormControl(''),
      final_date: new FormControl(''),
    });

    this.getAllCategories();
  }

  onSubmit() {
    if (!this.form.value.initial_date || !this.form.value.final_date) {
      this.openToast('error', 'Informe as datas inicial e final');
      return;
    }

    this.getFilterTransaction();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getFilterTransaction() {
    this.transactionService
      .getFilterTransaction({
        ...this.form.value,
      })
      .subscribe((transactions) => {
        this.getTransactionGroupByCategory(
          this.form.value.initial_date,
          this.form.value.final_date
        );
        this.transactions = transactions.map((transaction) => {
          transaction.type === 'revenue'
            ? (this.totalRevenues += transaction.value)
            : (this.totalExpenses += transaction.value);
          transaction.type = fomatTypeTransactionForView(transaction.type);
          return transaction;
        });
      });
  }

  getTransactionGroupByCategory(initial_date: string, final_date: string) {
    this.transactionService
      .getTransactionsGroupByCategory(initial_date, final_date)
      .subscribe((transactions) => {
        this.transactionsGroupByCategory = transactions;
      });
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

  get transaction_type() {
    return this.form.get('transaction_type');
  }
  get categoryId() {
    return this.form.get('categoryId');
  }
  get initial_date() {
    return this.form.get('initial_date');
  }
  get final_date() {
    return this.form.get('final_date');
  }
}
