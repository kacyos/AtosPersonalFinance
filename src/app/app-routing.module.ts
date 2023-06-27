import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/account/login/login.component';
import { CreateAccountComponent } from './pages/account/create-account/create-account.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { authGuard } from '../guard/auth.guard';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashBoardComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },
    ],
  },

  /* {
    path: 'create-account',
    component: CreateAccountComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
