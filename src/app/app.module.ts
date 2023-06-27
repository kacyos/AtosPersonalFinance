import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './pages/account/create-account/create-account.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './pages/account/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    DashBoardComponent,
    LoginComponent,
    CreateAccountComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // FormsModule,
    httpInterceptorProviders,
    // TransactionService,
    // HttpClientModule,
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
