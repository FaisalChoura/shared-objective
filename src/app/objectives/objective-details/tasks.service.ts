import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../objective.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _displayedTask = new BehaviorSubject<Task>(null);

  constructor() {}

  get displayedTask() {
    return this._displayedTask.asObservable();
  }

  setDisplayedTask(task: Task) {
    this._displayedTask.next(task);
  }
}
