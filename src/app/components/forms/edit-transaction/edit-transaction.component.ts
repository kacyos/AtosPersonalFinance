import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-form-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class FormEditTransactionComponent {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  @Output()
  editTransaction = new EventEmitter<any>();
  @Input()
  transaction_id?: number;

  categories: ICategory[] = [];

  editTransactionForm!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories();

    this.editTransactionForm = new FormGroup({
      type: new FormControl(''),
      category_id: new FormControl(''),
      date: new FormControl(''),
      value: new FormControl('', [Validators.min(1)]),
      description: new FormControl('', [
        Validators.maxLength(50),
        Validators.nullValidator,
      ]),
    });
  }

  handleEdit(transaction: string) {
    this.editTransaction.emit(transaction);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    this.handleEdit('teste');

    if (this.editTransactionForm.invalid) {
      return;
    }

    /*   this.transactionService
      .postCreateTransaction({
        ...this.editTransactionForm.value,
        date: DateConverter.ConvetDateInput(this.date),
      })

      .subscribe((transaction) => {
        this.create(transaction);
      });
    this.editTransactionForm.reset();*/
  }

  get type() {
    return this.editTransactionForm.get('type')!;
  }

  get value() {
    return this.editTransactionForm.get('value')!;
  }

  get category_id() {
    return this.editTransactionForm.get('category_id')!;
  }

  get date() {
    return this.editTransactionForm.get('date')!.value;
  }

  get description() {
    return this.editTransactionForm.get('description')!;
  }
}
