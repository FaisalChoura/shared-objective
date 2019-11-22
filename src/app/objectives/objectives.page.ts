import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ObjectivesService } from './objectives.service';
import { Objective } from './objective.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.page.html',
  styleUrls: ['./objectives.page.scss']
})
export class ObjectivesPage implements OnInit, OnDestroy {
  objectives: Objective[];
  objectivesSub: Subscription;

  constructor(private objectivesService: ObjectivesService) {}

  ngOnInit() {
    this.objectivesSub = this.objectivesService.objectives.subscribe(
      objectives => {
        this.objectives = objectives;
      }
    );
  }

  ngOnDestroy() {
    if (this.objectivesSub) {
      this.objectivesSub.unsubscribe();
    }
  }
}
