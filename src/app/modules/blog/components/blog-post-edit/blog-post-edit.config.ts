import { defaultLanguage } from '../../../../app.config';
import { EditBlogPostRequest } from './blog-post-edit.model';

export const defaultEditBlogPost: EditBlogPostRequest = {
  title: '',
  content: '',
  language: defaultLanguage.code,
  path: '',
}
