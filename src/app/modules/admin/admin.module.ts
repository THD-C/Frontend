import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { routes } from './admin.routes';
import { GridEditButtonDirective } from '../../directives/grid-edit-button/grid-edit-button.directive';
import { GridDeleteButtonDirective } from '../../directives/grid-delete-button/grid-delete-button.directive';
import { AdminUserEditComponent } from './components/admin/admin-user-edit/admin-user-edit.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    AdminComponent,
    AdminUsersComponent,
    AdminUserEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,

    DxTabsModule,
    DxScrollViewModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxValidatorModule,

    GridEditButtonDirective,
    GridDeleteButtonDirective,

    HeaderComponent,
  ]
})
export class AdminModule { }
