import { Component, input, output } from '@angular/core';
import { RegisterRequest } from '../register.model';

@Component({
  selector: 'app-register-personal-data',
  templateUrl: './register-personal-data.component.html',
  styleUrl: './register-personal-data.component.scss'
})
export class RegisterPersonalDataComponent {

  registerRequest = input.required<RegisterRequest>();
  onPreviousStepClicked = output<void>();
  onNextStepClicked = output<void>();

  get isFormValid(): boolean {
    return this.registerRequest().name.length > 0
      && this.registerRequest().surname.length > 0
  }

  protected goPreviousStep(): void {
    this.onPreviousStepClicked.emit();
  }

  protected goNextStep(): void {
    if (this.isFormValid === false) {
      return;
    }

    this.onNextStepClicked.emit();
  }

}
