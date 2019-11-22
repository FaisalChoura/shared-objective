import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjectiveDetailsPage } from './objective-details.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectiveDetailsPage
  },
  {
    path: 'task-details',
    loadChildren: () =>
      import('./task-details/task-details.module').then(
        m => m.TaskDetailsPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectiveDetailsPageRoutingModule {}
