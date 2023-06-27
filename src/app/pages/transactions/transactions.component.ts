import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  transactionForm!: FormGroup;

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
    this.getAllTransactions();
    this.getAllCategories();

    this.transactionForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.min(10)]),
      category_id: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  get type() {
    return this.transactionForm.get('type')!;
  }

  get value() {
    return this.transactionForm.get('value')!;
  }

  get category_id() {
    return this.transactionForm.get('category_id')!;
  }

  get date() {
    return this.transactionForm.get('date')!.value;
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    });

    console.log(this.transactionForm);
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

  onSubmit() {
    console.log(DateConverter.ConvetDateInput(this.date));
    this.transactionService
      .postCreateTransaction({
        ...this.transactionForm.value,
        date: DateConverter.ConvetDateInput(this.date),
      })

      .subscribe((transaction) => {
        this.transactions.push({
          ...transaction,
          type: transaction.type === 'revenue' ? 'Entrada' : 'Saída',
        });
      });
  }
  openModal(transaction: ITransaction) {
    this.transactionSelected = transaction;
    console.log(transaction);
  }
}
