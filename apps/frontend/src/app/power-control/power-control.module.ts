import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerControlComponent } from './power-control.component';
import { PowerControlService } from './power-grid.service';


@NgModule({
  declarations: [PowerControlComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PowerControlComponent
  ],
  providers: [
    PowerControlService
  ]
})
export class PowerControlModule { }
