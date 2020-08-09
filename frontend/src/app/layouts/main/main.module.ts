import { NgModule } from "@angular/core";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { NgbCarouselModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { CarouselComponent } from "./carousel/carousel.component";
import { AboutComponent } from "./about/about.component";
import { AdvantagesComponent } from "./advantages/advantages.component";
import { MenuComponent } from "./menu/menu.component";
import { PartnersComponent } from "./partners/partners.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ProfileComponent } from "./profile/profile.component";
import { CurrentCurrencyPipe } from "../../core/pipes/current-currency.pipe";
import { LoaderWrapperComponent } from "../../ui/loader-wrapper/loader-wrapper.component";
import { PageHeaderComponent } from "../../ui/page-header/page-header.component";
import { PizzasComponent } from "./pages/pizzas/pizzas.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { PartnerComponent } from "./pages/partners/partner.component";
import { GalleriesComponent } from "./pages/galleries/galleries.component";
import { TestimonialsPageComponent } from "./pages/testimonials/testimonials.component";
import { ContactComponent } from "./pages/contact/contact.component";

const COMPONENTS = [
  MainComponent,
  NavbarComponent,
  FooterComponent,
  HomeComponent,
  CarouselComponent,
  AboutComponent,
  AdvantagesComponent,
  MenuComponent,
  PartnersComponent,
  GalleryComponent,
  TestimonialsComponent,
  CartComponent,
  CheckoutComponent,
  LoginComponent,
  SignUpComponent,
  ProfileComponent,
  LoaderWrapperComponent,
  PageHeaderComponent,
  PizzasComponent,
  AboutUsComponent,
  PartnerComponent,
  GalleriesComponent,
  TestimonialsPageComponent,
  ContactComponent
];

@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    NgbCarouselModule,
    NgxGalleryModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    ...COMPONENTS,
    CurrentCurrencyPipe,
  ],
  providers: []
})

export class MainModule {
}
