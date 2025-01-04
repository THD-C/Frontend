import { availableLanguages, Language } from '../../../../app.config';

export type BlogPost = {
  title: string;
  /**
   * Based on {@link availableLanguages}'s {@link Language.code} in the system.
   */
  language: string;
  path: string;
  content: string;
}

export type CreateBlogPostRequest = {
  title: string;
  language: string;
  content: string;
}

export type UpdateBlogPostRequest = {
  title: string;
  language: string;
  content: string;

  /**
   * Non-editable element. 
   * Updated only on the back-end!
   */
  path: string;
}

/**
 * Shared type for creating and updating a blog post.
 */
export type EditBlogPostRequest = UpdateBlogPostRequest;
