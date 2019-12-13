import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "objectives",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthPageModule)
  },
  {
    path: "objectives",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./objectives/objectives.module").then(m => m.ObjectivesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
