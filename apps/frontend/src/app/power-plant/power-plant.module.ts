import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerPlantComponent } from './power-plant.component';
import { PowerPlantService } from './power-plant.service';
import { PhElementsModule } from 'lib/phobos-elements/ph-elements.module';

@NgModule({
  declarations: [PowerPlantComponent],
  imports: [
    CommonModule,
    PhElementsModule
  ],
  exports: [
    PowerPlantComponent
  ],
  providers: [
    PowerPlantService
  ]
})
export class PowerPlantModule { }
