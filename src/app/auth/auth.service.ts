import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  // TODO Change name of method and restructure how this works
  public isLoggedIn() {
    return this.afAuth.user;
  }

  public login(email, password): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public signUp(email, password): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.router.navigateByUrl("/auth"));
  }
}
