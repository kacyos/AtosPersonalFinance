import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [DashBoardComponent],
  imports: [HttpClientModule, CommonModule],
  providers: [TransactionService],
})
export class PagesModule {}
