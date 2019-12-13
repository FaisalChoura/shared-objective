import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

import { ObjectivesService } from "../../objectives.service";
import { Objective, Task } from "../../objective.model";
import { TasksService } from "../../tasks.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"]
})
export class NewTaskComponent implements OnInit {
  @Input() objective: Objective;
  @ViewChild("f", { static: false }) form: NgForm;
  private _userId: string;
  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private tasksService: TasksService,
    private loadingCtrl: LoadingController
  ) {}
  // TODO close subscriptions
  ngOnInit() {
    this.authService.userId.subscribe(userId => (this._userId = userId));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onCreateTask() {
    if (!this.form.valid && this._userId) {
      this.modalCtrl.dismiss();
      return;
    }
    this.loadingCtrl.create({ message: "Creating Task" }).then(loadingEl => {
      loadingEl.present();
      const newTask: Task = new Task(
        this.form.value.title,
        this.form.value.description,
        this.objective.id,
        this._userId
      );
      this.tasksService.newTask(newTask).then(() => {
        loadingEl.dismiss();
        this.modalCtrl.dismiss();
      });
    });
  }
}
