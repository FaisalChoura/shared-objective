import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ObjectivesPage } from "./objectives.page";

const routes: Routes = [
  {
    path: "",
    component: ObjectivesPage
  },
  {
    path: "new",
    loadChildren: () =>
      import("./new-objective/new-objective.module").then(
        m => m.NewObjectivePageModule
      )
  },
  {
    path: ":objectiveId",
    loadChildren: () =>
      import("./objective-details/objective-details.module").then(
        m => m.ObjectiveDetailsPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectivesPageRoutingModule {}
