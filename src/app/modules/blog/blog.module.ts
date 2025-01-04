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
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';

import { routes } from './blog.routes';
import { BlogPostEditComponent } from './components/blog-post-edit/blog-post-edit.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html.pipe';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    BlogPostEditComponent,
    BlogPostsComponent,
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
    HeaderComponent,
    SafeHtmlPipe,
    DxLoadPanelModule,
  ],
})
export class BlogModule { }
