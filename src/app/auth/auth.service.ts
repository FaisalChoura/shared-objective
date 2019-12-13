import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { first, map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  get user(): Observable<firebase.User> {
    return this.afAuth.user;
  }

  get userId(): Observable<string> {
    return this.user.pipe(
      switchMap(user => {
        if (user) {
          return of(user.uid);
        }
        return of(null);
      })
    );
  }

  public isLoggedIn() {
    return this.afAuth.user.pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
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
