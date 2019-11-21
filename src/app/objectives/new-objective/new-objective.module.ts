import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewObjectivePageRoutingModule } from './new-objective-routing.module';

import { NewObjectivePage } from './new-objective.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewObjectivePageRoutingModule
  ],
  declarations: [NewObjectivePage]
})
export class NewObjectivePageModule {}
