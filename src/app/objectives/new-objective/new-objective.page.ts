import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ObjectivesService } from "../objectives.service";
import { Objective } from "../objective.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-new-objective",
  templateUrl: "./new-objective.page.html",
  styleUrls: ["./new-objective.page.scss"]
})
export class NewObjectivePage implements OnInit {
  @ViewChild("f", { static: false }) form: NgForm;
  private _userId: string;
  constructor(
    private objectivesService: ObjectivesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userId.subscribe(userId => {
      this._userId = userId;
    });
  }

  onCreateObjective() {
    if (!this.form.valid) {
      return;
    }
    this.objectivesService
      .createObjective(new Objective(this.form.value.title, [], this._userId))
      .then(() => {
        this.router.navigateByUrl("/objectives");
      });
  }
}
