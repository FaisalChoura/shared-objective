import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { ObjectivesService } from '../../objectives.service';
import { Objective, Task } from '../../objective.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  @Input() objective: Objective;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    private objectivesService: ObjectivesService
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
      Math.random().toString(),
      this.form.value.title,
      this.form.value.description
    );
    const newObjective: Objective = new Objective(
      this.objective.id,
      this.objective.title,
      this.objective.tasks.concat(newTask)
    );
    this.objectivesService.updateObjective(newObjective).subscribe(() => {
      this.modalCtrl.dismiss();
    });
  }
}
