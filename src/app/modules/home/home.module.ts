import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from '../../shared/components/header/header.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,

    HeaderComponent,
  ]
})
export class HomeModule { }
