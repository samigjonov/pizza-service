import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { HomeComponent } from "./home/home.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ProfileComponent } from "./profile/profile.component";
import { PizzasComponent } from "./pages/pizzas/pizzas.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { PartnerComponent } from "./pages/partners/partner.component";
import { GalleriesComponent } from "./pages/galleries/galleries.component";
import { TestimonialsPageComponent } from "./pages/testimonials/testimonials.component";
import { ContactComponent } from "./pages/contact/contact.component";

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
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'menu',
        component: PizzasComponent
      },
      {
        path: 'about',
        component: AboutUsComponent
      },
      {
        path: 'partners',
        component: PartnerComponent
      },
      {
        path: 'gallery',
        component: GalleriesComponent
      },
      {
        path: 'testimonials',
        component: TestimonialsPageComponent
      },
      {
        path: 'contact',
        component: ContactComponent
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
