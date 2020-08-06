import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { HomeComponent } from "./home/home.component";
import { CheckoutComponent } from "./checkout/checkout.component";

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
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
