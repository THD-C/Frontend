import { Directive } from '@angular/core';
import { DxButtonComponent } from 'devextreme-angular/ui/button';

@Directive({
  selector: '[appGridDeleteButton]',
  standalone: true
})
export class GridDeleteButtonDirective {

  constructor(private readonly dxButton: DxButtonComponent) {
    dxButton.hint = $localize`:@@Delete:Delete`;
    dxButton.icon = 'trash';
    dxButton.stylingMode = 'text';
    dxButton.type = 'danger';
  }

}
