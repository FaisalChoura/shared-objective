import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController, ModalController } from "@ionic/angular";
import { Subscription, Observable } from "rxjs";

import { ObjectivesService } from "../objectives.service";
import { Objective, Task } from "../objective.model";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksService } from "../tasks.service";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-objective-details",
  templateUrl: "./objective-details.page.html",
  styleUrls: ["./objective-details.page.scss"]
})
export class ObjectiveDetailsPage implements OnInit, OnDestroy {
  objective: Objective;
  tasks: Task[];
  objectiveSub: Subscription;
  isLoading: boolean = true;
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
    // No need to unsubscribe from route because Activated Route destroys the subscription
    // when it's no longer needed
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("objectiveId")) {
        this.navCtrl.navigateBack("/objectives");
        return;
      }
      id = paramMap.get("objectiveId");
    });
    this.objectivesService
      .getObjective(id)
      .pipe(
        switchMap(doc => {
          const obj = doc[0];
          this.objective = new Objective(obj.title, [], null, id);
          return this.objectivesService.getObjectiveTasks(id);
        }),
        tap(tasks => {
          this.objective.tasks = tasks;
          this.tasks = tasks;
          this.isLoading = false;
        })
      )
      .subscribe();
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
