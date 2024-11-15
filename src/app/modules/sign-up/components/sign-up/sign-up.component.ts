import { Component } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/common';
import { ClickEvent } from 'devextreme/ui/button';
import { TextBoxType } from 'devextreme/ui/text_box';

import { SignUpRequest } from './sign-up.model';
import { passwordButtonOptions } from './sign-up.config';

import { validatePassword } from '../../../../shared/validators/password-strength.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  passwordMode: TextBoxType = 'password';
  newUser: SignUpRequest = {
    id: 0,
    username: '',
    email: '',
    password: '',
    confirm: '',
    user_detail_id: 0,
  };
  passwordErrors: string[] = [];

  get showPasswordErrors(): boolean {
    console.log('this.passwordErrors',this.passwordErrors);
    return this.passwordErrors.length > 0;
  }

  readonly passwordButtonOptions = {
    ...passwordButtonOptions,
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  validatePassword(callbackData: ValidationCallbackData): boolean {
    this.passwordErrors = validatePassword(callbackData.value);
    return this.passwordErrors.length === 0;
  }

  async submit(clickEvent: ClickEvent): Promise<void> {
    clickEvent.event?.preventDefault();
    clickEvent.event?.stopImmediatePropagation();
  }

}
