import { Component, OnInit } from "@angular/core";

import { ObjectivesService } from "./objectives.service";
import { Objective } from "./objective.model";

@Component({
  selector: "app-objectives",
  templateUrl: "./objectives.page.html",
  styleUrls: ["./objectives.page.scss"]
})
export class ObjectivesPage implements OnInit {
  objectives: Objective[];

  constructor(private objectivesService: ObjectivesService) {}

  ngOnInit() {
    this.objectivesService.objectives.subscribe(objectives => {
      this.objectives = objectives;
    });
  }
}
