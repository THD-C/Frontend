import { Component, input, output } from '@angular/core';
import { RegisterRequest } from '../register.model';

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.component.html',
  styleUrl: './register-address.component.scss'
})
export class RegisterAddressComponent {

  registerRequest = input.required<RegisterRequest>();
  onPreviousStepClicked = output<void>();
  onNextStepClicked = output<void>();

  get isFormValid(): boolean {
    return this.registerRequest().street.length > 0
      && this.registerRequest().building.length > 0
      && this.registerRequest().city.length > 0
      && this.registerRequest().postal_code.length > 0
      && this.registerRequest().country.length > 0
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
