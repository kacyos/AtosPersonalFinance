import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-form-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
})
export class FormCreateTransactionComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  @Output()
  registerNewTransaction = new EventEmitter<any>();

  categories: ICategory[] = [];

  createTransactionForm!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories();

    this.createTransactionForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [
        Validators.maxLength(50),
        Validators.nullValidator,
      ]),
    });
  }

  create(transaction: ITransaction) {
    this.registerNewTransaction.emit(transaction);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.createTransactionForm.invalid) {
      return;
    }

    this.transactionService
      .postCreateTransaction({
        ...this.createTransactionForm.value,
        date: DateConverter.ConvetDateInput(this.date),
      })

      .subscribe((transaction) => {
        this.create(transaction);
      });
    this.createTransactionForm.reset();
  }

  get type() {
    return this.createTransactionForm.get('type')!;
  }

  get value() {
    return this.createTransactionForm.get('value')!;
  }

  get category_id() {
    return this.createTransactionForm.get('category_id')!;
  }

  get date() {
    return this.createTransactionForm.get('date')!.value;
  }

  get description() {
    return this.createTransactionForm.get('description')!;
  }
}
