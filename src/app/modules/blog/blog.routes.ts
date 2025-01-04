import { Routes } from '@angular/router';
import { bloggerGuard } from '../../guards/blogger/blogger.guard';
import { blogPathParamNames } from './blog.model';
import { BlogPostEditComponent } from './components/blog-post-edit/blog-post-edit.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { BlogPostReadComponent } from './components/blog-post-read/blog-post-read.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'posts',
        pathMatch: 'full',
        component: BlogPostsComponent,
      },

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
        path: `read/:${blogPathParamNames.language}/:${blogPathParamNames.path}`,
        component: BlogPostReadComponent,
      },

      {
        path: '**',
        redirectTo: 'posts',
      }
    ]
  }
];
