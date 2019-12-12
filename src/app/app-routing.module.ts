import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "objectives",
    canLoad: [AuthGuard],
    pathMatch: "full"
  },
  {
    path: "objectives",
    canLoad: [AuthGuard],
    loadChildren: () =>
      import("./objectives/objectives.module").then(m => m.ObjectivesPageModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
