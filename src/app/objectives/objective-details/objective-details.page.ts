import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, ModalController } from "@ionic/angular";
import { Subscription, Observable } from "rxjs";

import { ObjectivesService } from "../objectives.service";
import { Objective, Task } from "../objective.model";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksService } from "../tasks.service";

@Component({
  selector: "app-objective-details",
  templateUrl: "./objective-details.page.html",
  styleUrls: ["./objective-details.page.scss"]
})
export class ObjectiveDetailsPage implements OnInit, OnDestroy {
  objective: Objective;
  tasks: Task[];
  objectiveSub: Subscription;
  constructor(
    private objectivesService: ObjectivesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    let id: string;
    this.objective = new Objective(null, null, null);
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("objectiveId")) {
        this.navCtrl.navigateBack("/objectives");
        return;
      }
      id = paramMap.get("objectiveId");
    });
    this.objectiveSub = this.objectivesService
      .getObjective(id)
      .subscribe(doc => {
        const obj = doc[0];
        this.objective = new Objective(id, obj.title, []);
        this.objectivesService.getObjectiveTasks(id).subscribe(tasks => {
          this.objective.tasks = tasks;
          this.tasks = tasks;
        });
      });
  }

  ngOnDestroy() {
    if (this.objectiveSub) {
      this.objectiveSub.unsubscribe();
    }
  }

  newTaskModal() {
    this.modalCtrl
      .create({
        component: NewTaskComponent,
        componentProps: {
          objective: this.objective
        }
      })
      .then(modalEl => {
        modalEl.present();
      });
  }
  // TODO Figure out how to properly manage these kinds of routes (do we need a separate tasks service)
  goToTaskDetails(task: Task) {
    this.tasksService.setDisplayedTask(task);
    this.navCtrl.navigateForward(
      `/objectives/${this.objective.id}/task-details`
    );
  }
}
