import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroneControlComponent } from './drone-control.component';
import { PhElementsModule } from 'lib/phobos-elements/ph-elements.module';

@NgModule({
  declarations: [DroneControlComponent],
  imports: [
    CommonModule,
    PhElementsModule
  ],
  exports: [
    DroneControlComponent
  ]
})
export class DroneControlModule { }
