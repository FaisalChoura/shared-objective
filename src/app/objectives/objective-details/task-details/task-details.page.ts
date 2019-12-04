import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Task, Objective } from "../../objective.model";
import { TasksService } from "../tasks.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.page.html",
  styleUrls: ["./task-details.page.scss"]
})
// TODO Change how this works after adding users and assigning tasks (this would probably need to be it's own page with an ID)
export class TaskDetailsPage implements OnInit, OnDestroy {
  task: Task;
  objectiveId: string;
  taskSub: Subscription;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskSub = this.tasksService.displayedTask.subscribe(task => {
      this.task = task;
    });
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("objectiveId")) {
        this.objectiveId = paramMap.get("objectiveId");
      }
    });
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }
}
