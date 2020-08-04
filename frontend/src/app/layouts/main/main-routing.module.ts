import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { HomeComponent } from "./home/home.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {
}
