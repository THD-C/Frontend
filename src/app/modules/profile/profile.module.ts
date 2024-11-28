import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxButtonModule } from 'devextreme-angular/ui/button';

import { routes } from './profile.routes';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile/profile-details/profile-details.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,

    DxTabsModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxButtonModule,
  ]
})
export class ProfileModule { }
