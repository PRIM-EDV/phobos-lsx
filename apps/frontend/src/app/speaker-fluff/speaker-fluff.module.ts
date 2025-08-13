import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerFluffComponent } from './speaker-fluff.component';
import { SpeakerFluffService } from './speaker-fluff.service';
import { PhElementsModule } from 'lib/phobos-elements/ph-elements.module';

@NgModule({
  declarations: [
    SpeakerFluffComponent
  ],
  imports: [
    CommonModule,
    PhElementsModule
  ],
  exports: [
    SpeakerFluffComponent
  ],
  providers: [
    SpeakerFluffService
  ]
})
export class SpeakerFluffModule { }
