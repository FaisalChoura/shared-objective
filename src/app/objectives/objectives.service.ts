import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest, forkJoin, of } from "rxjs";
import { take, tap, map } from "rxjs/operators";

import { Objective, Task } from "./objective.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ObjectivesService {
  private _objectives = new BehaviorSubject<Objective[]>([]);
  private objectivesCollection: AngularFirestoreCollection<Objective>;

  constructor(private afs: AngularFirestore) {
    this.objectivesCollection = afs.collection<Objective>("objectives");
  }

  get objectives() {
    return this._objectives;
  }

  loadObjectives() {
    return this.objectivesCollection.valueChanges({ idField: "id" }).pipe(
      tap(objectives => {
        this._objectives.next(objectives);
      })
    );
  }

  // fix type
  getObjective(id: string) {
    if (this.objectives.value.length === 0) {
      return this.objectivesCollection
        .doc(id)
        .valueChanges()
        .pipe(map(objective => [objective]));
    }
    return this.objectives.pipe(
      map(objectives => {
        return objectives.filter(obj => obj.id === id);
      })
    );
  }

  getObjectiveTasks(objectiveId: string) {
    return this.afs
      .collection<Task>("tasks", ref =>
        ref.where("objectiveId", "==", objectiveId)
      )
      .valueChanges();
  }

  // TODO fix how the data is added (create own interface)
  createObjective(objective: Objective) {
    return this.objectivesCollection.add({
      title: objective.title,
      tasks: objective.tasks
    } as Objective);
  }

  updateObjective(objective: Objective) {
    return this.objectives.pipe(
      take(1),
      tap(objectives => {
        const index = objectives.findIndex(o => o.id === objective.id);
        objectives[index] = objective;
        this._objectives.next(objectives);
      })
    );
  }
}
