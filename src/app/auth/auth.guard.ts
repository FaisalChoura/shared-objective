import { Injectable } from "@angular/core";
import {
  UrlSegment,
  Route,
  CanActivate,
  Router,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { tap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // TODO implement auto login
  // TODO Add guard to auth page if user is signed in
  // TODO Figure out you need take(1)
  // TODO Figure out why canLoad didn't work and canActivate did
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }
}
