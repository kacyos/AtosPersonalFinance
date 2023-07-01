import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-form-create-transaction',
  templateUrl: './form-create-transaction.component.html',
  styleUrls: [],
})
export class FormCreateTransactionComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  @Output()
  registerNewTransaction = new EventEmitter<any>();

  categories: ICategory[] = [];

  form!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories();

    this.form = new FormGroup({
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.createNewTransaction({
      ...this.form.value,
      date: DateConverter.ConvetDateInput(this.date),
    });

    this.form.reset();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  createNewTransaction(transaction: ITransaction) {
    this.transactionService
      .postCreateTransaction(transaction)
      .subscribe((transaction) => {
        this.registerNewTransaction.emit(transaction);
      });
  }

  get type() {
    return this.form.get('type')!;
  }

  get value() {
    return this.form.get('value')!;
  }

  get category_id() {
    return this.form.get('category_id')!;
  }

  get date() {
    return this.form.get('date')!.value;
  }

  get description() {
    return this.form.get('description')!;
  }
}
