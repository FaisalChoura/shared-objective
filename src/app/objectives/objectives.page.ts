import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ObjectivesService } from "./objectives.service";

@Component({
  selector: "app-objectives",
  templateUrl: "./objectives.page.html",
  styleUrls: ["./objectives.page.scss"]
})
export class ObjectivesPage implements OnInit, OnDestroy {
  public objectives;
  public isLoading = true;
  private _objectivesSub: Subscription;

  constructor(private objectivesService: ObjectivesService) {}

  // TODO this does not look right
  ngOnInit() {
    // This is the initial call to load objectives from firebase
    this._objectivesSub = this.objectivesService
      .loadObjectives()
      .subscribe(() => {
        this.isLoading = false;
      });

    // This assign the objectives after the call
    this.objectives = this.objectivesService.objectives;
  }

  ngOnDestroy() {
    if (this._objectivesSub) {
      this._objectivesSub.unsubscribe();
    }
  }
}
