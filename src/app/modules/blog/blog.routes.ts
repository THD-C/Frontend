import { Routes } from '@angular/router';
import { bloggerGuard } from '../../guards/blogger/blogger.guard';
import { blogPathParamNames } from './blog.model';
import { BlogPostEditComponent } from './components/blog-post-edit/blog-post-edit.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: `edit`,
        pathMatch: 'full',
        redirectTo: `edit/`,
      },
      {
        path: `edit/:${blogPathParamNames.language}`,
        component: BlogPostEditComponent,
        canActivate: [bloggerGuard],
      },
      {
        path: `edit/:${blogPathParamNames.language}/:${blogPathParamNames.path}`,
        component: BlogPostEditComponent,
        canActivate: [bloggerGuard],
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  }
];
