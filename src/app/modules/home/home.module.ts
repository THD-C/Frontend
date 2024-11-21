import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';


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
    DxChartModule,
    DxButtonModule,

    HeaderComponent,
  ]
})
export class HomeModule { }
