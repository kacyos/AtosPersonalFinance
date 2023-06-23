import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './pages/account/login/login.component';
import { CreateAccountComponent } from './pages/account/create-account/create-account.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    CreateAccountComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, PagesModule, FormsModule],
  providers: [FormsModule, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
