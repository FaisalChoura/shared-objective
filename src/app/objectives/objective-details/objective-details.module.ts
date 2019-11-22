import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ObjectiveDetailsPageRoutingModule } from "./objective-details-routing.module";

import { ObjectiveDetailsPage } from "./objective-details.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjectiveDetailsPageRoutingModule
  ],
  declarations: [ObjectiveDetailsPage],
  entryComponents: []
})
export class ObjectiveDetailsPageModule {}
