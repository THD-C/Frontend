import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterLink } from '@angular/router';

import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

import { routes } from './blog.routes';
import { BlogPostEditComponent } from './components/blog-post-edit/blog-post-edit.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    BlogPostEditComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    DxSelectBoxModule,
    DxButtonModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxScrollViewModule,
  ]
})
export class BlogModule { }
