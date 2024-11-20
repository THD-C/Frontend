import { Component, viewChild } from '@angular/core';
import { ValidationCallbackData } from 'devextreme/common';
import { TextBoxType } from 'devextreme/ui/text_box';
import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';

import { nextStepsMap, previousStepsMap, RegisterRequest, RegisterStep } from './register.model';

import { validatePassword } from '../../../../shared/validators/password-strength.validator';
import { AuthService } from '../../../../services/user/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly RegisterStep = RegisterStep;
  currentStep: RegisterStep = RegisterStep.Credentials;

  registerRequest: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    street: '',
    building: '',
    city: '',
    postal_code: '',
    country: ''
  };

  constructor(private readonly authService: AuthService) {}

  handlePreviousStepClick(): void {
    this.currentStep = previousStepsMap.get(this.currentStep) ?? RegisterStep.Credentials;
  }

  handleNextStepClick(): void {
    this.currentStep = nextStepsMap.get(this.currentStep) ?? RegisterStep.Credentials;
  }

  async submit(): Promise<void> {
    try {
      await this.authService.register(this.registerRequest);
    } catch(e) {
    }
  }

}
