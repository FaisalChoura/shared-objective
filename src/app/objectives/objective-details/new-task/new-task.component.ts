import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

import { ObjectivesService } from "../../objectives.service";
import { Objective, Task } from "../../objective.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"]
})
export class NewTaskComponent implements OnInit {
  @Input() objective: Objective;
  @ViewChild("f", { static: false }) form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    private objectivesService: ObjectivesService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onCreateTask() {
    if (!this.form.valid) {
      this.modalCtrl.dismiss();
      return;
    }
    const newTask: Task = new Task(
      this.form.value.title,
      this.form.value.description,
      this.objective.id
    );
    this.tasksService.newTask(newTask).then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
