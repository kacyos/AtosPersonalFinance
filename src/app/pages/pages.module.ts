import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [DashBoardComponent, TransactionsComponent],
  imports: [HttpClientModule, CommonModule],
  providers: [TransactionService, HttpClientModule],
})
export class PagesModule {}
