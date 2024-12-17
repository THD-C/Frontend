import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './privacy-policy.routes';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';


@NgModule({
  providers: [
    provideRouter(routes),
  ],
  declarations: [
    PrivacyPolicyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class PrivacyPolicyModule { }
