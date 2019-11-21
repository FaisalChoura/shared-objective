import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewObjectivePage } from './new-objective.page';

const routes: Routes = [
  {
    path: '',
    component: NewObjectivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewObjectivePageRoutingModule {}
