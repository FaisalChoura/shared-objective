import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest, forkJoin, of } from "rxjs";
import { take, tap, map, switchMap } from "rxjs/operators";

import { Objective, Task } from "./objective.model";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "@angular/fire/firestore";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ObjectivesService {
  private _objectives = new BehaviorSubject<Objective[]>([]);
  private objectivesCollection: AngularFirestoreCollection<Objective>;

  // TODO check if this is the right way to get the uid then get the objectives related
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.objectivesCollection = afs.collection<Objective>("objectives");
  }

  get objectives() {
    return this._objectives;
  }

  loadObjectives() {
    return this.authService.userId.pipe(
      switchMap(uid => {
        return this.afs
          .collection<Objective>("objectives", ref =>
            ref.where("ownerId", "==", uid)
          )
          .valueChanges({ idField: "id" });
      }),
      tap(objectives => {
        this._objectives.next(objectives);
      })
    );
  }

  getObjective(id: string): Observable<Objective[]> {
    if (this.objectives.value.length === 0) {
      return this.objectivesCollection
        .doc(id)
        .valueChanges()
        .pipe(map((objective: Objective) => [objective]));
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

  createObjective(objective: Objective) {
    return this.objectivesCollection.add({
      title: objective.title,
      tasks: objective.tasks,
      ownerId: objective.ownerId
    });
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
