import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ObjectivesService } from "../objectives.service";
import { Objective } from "../objective.model";

@Component({
  selector: "app-new-objective",
  templateUrl: "./new-objective.page.html",
  styleUrls: ["./new-objective.page.scss"]
})
export class NewObjectivePage implements OnInit {
  @ViewChild("f", { static: false }) form: NgForm;
  constructor(
    private objectivesService: ObjectivesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onCreateObjective() {
    if (!this.form.valid) {
      return;
    }
    this.objectivesService
      .createObjective(new Objective(null, this.form.value.title, []))
      .then(() => {
        this.router.navigateByUrl("/objectives");
      });
  }
}
