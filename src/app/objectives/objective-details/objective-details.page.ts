import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, ModalController } from "@ionic/angular";

import { ObjectivesService } from "../objectives.service";
import { Objective, Task } from "../objective.model";
import { NewTaskComponent } from "./new-task/new-task.component";

@Component({
  selector: "app-objective-details",
  templateUrl: "./objective-details.page.html",
  styleUrls: ["./objective-details.page.scss"]
})
export class ObjectiveDetailsPage implements OnInit {
  objective: Objective;
  tasks: Task[];
  constructor(
    private objectivesService: ObjectivesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    let id: string;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("objectiveId")) {
        this.navCtrl.navigateBack("/objectives");
        return;
      }
      id = paramMap.get("objectiveId");
    });
    this.objectivesService.getObjective(id).subscribe(objective => {
      this.objective = objective;
      this.tasks = objective.tasks;
    });
  }

  newTaskModal() {
    this.modalCtrl
      .create({
        component: NewTaskComponent
      })
      .then(modalEl => {
        modalEl.present();
      });
  }
}
