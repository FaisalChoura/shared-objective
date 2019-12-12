import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.loadingCtrl
      .create({ keyboardClose: true, message: this.loadingMessage() })
      .then(loadingEl => {
        loadingEl.present();
        let authProm: Promise<firebase.auth.UserCredential>;
        if (this.isLogin) {
          authProm = this.authService.login(email, password);
        } else {
          authProm = this.authService.signUp(email, password);
        }
        authProm
          .then(response => {
            loadingEl.dismiss();
            this.router.navigateByUrl("/objectives");
          })
          .catch((error: firebase.auth.Error) => {
            const code = error.code;
            let message = "Could not sign you up, please try again.";
            if (code === "auth/email-already-in-use") {
              message = "This email address exists already!";
            } else if (code === "auth/invalid-email") {
              message = "E-Mail address could not be found.";
            }
            loadingEl.dismiss();
            this.showAlert(message);
          });
      });
    form.reset();
  }

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({ message, header: "Authentication Failed", buttons: ["Okay"] })
      .then(alertEl => {
        alertEl.present();
      });
  }

  private loadingMessage(): string {
    return this.isLogin ? "Logging in" : "Signing up";
  }
}
