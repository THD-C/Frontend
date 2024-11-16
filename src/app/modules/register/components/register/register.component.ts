import { Component } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/common';
import { ClickEvent } from 'devextreme/ui/button';
import { TextBoxType } from 'devextreme/ui/text_box';

import { RegisterRequest } from './register.model';
import { passwordButtonOptions } from './register.config';

import { validatePassword } from '../../../../shared/validators/password-strength.validator';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private readonly userService: UserService) {
  }

  passwordMode: TextBoxType = 'password';
  newUser: RegisterRequest = {
    id: 0,
    username: '',
    email: '',
    password: '',
    user_detail_id: 0,
  };
  passwordErrors: string[] = [];

  get showPasswordErrors(): boolean {
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

    try {
      await this.userService.register(this.newUser);
    } catch(e) {

    }
  }

}
