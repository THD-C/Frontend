import { Directive } from '@angular/core';
import { DxButtonComponent } from 'devextreme-angular/ui/button';

@Directive({
  selector: '[appGridEditButton]',
  standalone: true
})
export class GridEditButtonDirective {

  constructor(private readonly dxButton: DxButtonComponent) {
    dxButton.hint = $localize`:@@Edit:Edit`;
    dxButton.icon = 'edit';
    dxButton.stylingMode = 'text';
    dxButton.type = 'default';
  }

}
