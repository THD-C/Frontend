import { Component } from '@angular/core';

import { nextStepsMap, previousStepsMap, RegisterRequest, RegisterStep } from './register.model';

import { AuthService } from '../../../../services/user/auth.service';
import { appName } from '../../../../app.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly appName = appName;
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
