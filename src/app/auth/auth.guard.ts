import { Injectable } from "@angular/core";
import { UrlSegment, Route, CanLoad, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { map, switchMap, tap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // TODO implement auto login
  canLoad(
    route: Route,
    urlSegments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
      take(1),
      switchMap(user => {
        console.log(user);
        if (user) {
          console.log("hi");
          return of(true);
        }
        console.log("bue");
        return of(false);
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }
}
