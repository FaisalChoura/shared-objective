import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ObjectivesService } from "../objectives.service";
import { Objective } from "../objective.model";
import { AuthService } from "src/app/auth/auth.service";
import { LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-new-objective",
  templateUrl: "./new-objective.page.html",
  styleUrls: ["./new-objective.page.scss"]
})
export class NewObjectivePage implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) form: NgForm;
  private _userId: string;
  private _authSub: Subscription;
  constructor(
    private objectivesService: ObjectivesService,
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this._authSub = this.authService.userId.subscribe(userId => {
      this._userId = userId;
    });
  }

  ngOnDestroy() {
    if (this._authSub) {
      this._authSub.unsubscribe();
    }
  }

  onCreateObjective() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({ message: "Creating Objective" })
      .then(loadingEl => {
        loadingEl.present();
        this.objectivesService
          .createObjective(
            new Objective(this.form.value.title, [], this._userId)
          )
          .then(() => {
            loadingEl.dismiss();
            this.router.navigateByUrl("/objectives");
          });
      });
  }
}
