import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';

import { routes } from './sign-up.routes';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class SignUpModule { }
