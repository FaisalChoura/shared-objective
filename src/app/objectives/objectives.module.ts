import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ObjectivesPageRoutingModule } from "./objectives-routing.module";

import { ObjectivesPage } from "./objectives.page";
import { NewTaskComponent } from "./objective-details/new-task/new-task.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjectivesPageRoutingModule
  ],
  declarations: [ObjectivesPage, NewTaskComponent],
  entryComponents: [NewTaskComponent]
})
export class ObjectivesPageModule {}
