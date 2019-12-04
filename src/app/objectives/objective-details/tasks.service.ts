import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task } from "../objective.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private _displayedTask = new BehaviorSubject<Task>(null);
  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = afs.collection<Task>("tasks");
  }

  get displayedTask() {
    return this._displayedTask.asObservable();
  }

  setDisplayedTask(task: Task) {
    this._displayedTask.next(task);
  }

  newTask(task: Task) {
    return this.tasksCollection.add({
      title: task.title,
      description: task.description,
      objectiveId: task.objectiveId
    });
  }
}
