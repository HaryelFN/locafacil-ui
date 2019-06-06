import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
