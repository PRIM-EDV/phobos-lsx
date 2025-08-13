import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLockdownComponent } from './base-lockdown.component';
import { BaseLockdownService } from './base-lockdown.service';
import { PhElementsModule } from 'lib/phobos-elements/ph-elements.module';

@NgModule({
  declarations: [
    BaseLockdownComponent
  ],
  imports: [
    CommonModule,
    PhElementsModule
  ],
  exports: [
    BaseLockdownComponent
  ],
  providers: [
    BaseLockdownService
  ]
})
export class BaseLockdownModule { }
