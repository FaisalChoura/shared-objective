import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ObjectivesService } from "./objectives.service";
import { Objective } from "./objective.model";
import { shareReplay } from "rxjs/operators";

@Component({
  selector: "app-objectives",
  templateUrl: "./objectives.page.html",
  styleUrls: ["./objectives.page.scss"]
})
export class ObjectivesPage implements OnInit, OnDestroy {
  objectives;
  objectivesSub: Subscription;

  constructor(private objectivesService: ObjectivesService) {}

  ngOnInit() {
    this.objectivesService.loadObjectives().subscribe();
    this.objectives = this.objectivesService.objectives;
  }

  ngOnDestroy() {
    if (this.objectivesSub) {
      this.objectivesSub.unsubscribe();
    }
  }
}
