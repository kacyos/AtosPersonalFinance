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
  @Output()
  searchTransaction = new EventEmitter<any>();

  categories: ICategory[] = [];

  form!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories();

    this.form = new FormGroup({
      type: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
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

    this.handleCreate({
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

  handleCreate(transaction: ITransaction) {
    this.registerNewTransaction.emit(transaction);
  }

  handleSearch() {
    this.form.value.description = '';
    this.searchTransaction.emit(this.form.value);
  }

  get type() {
    return this.form.get('type')!;
  }

  get value() {
    return this.form.get('value')!;
  }

  get categoryId() {
    return this.form.get('categoryId')!;
  }

  get date() {
    return this.form.get('date')!.value;
  }

  get description() {
    return this.form.get('description')!;
  }
}
