import { NgModule } from "@angular/core";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { CarouselComponent } from "./carousel/carousel.component";
import { AboutComponent } from "./about/about.component";
import { AdvantagesComponent } from "./advantages/advantages.component";
import { MenuComponent } from "./menu/menu.component";
import { PartnersComponent } from "./partners/partners.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { TestimonialsComponent } from "./testimonials/testimonials.component";

@NgModule({
  imports: [MainRoutingModule, CommonModule, NgbCarouselModule, NgxGalleryModule],
  exports: [],
  declarations: [
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
    TestimonialsComponent
  ]
})

export class MainModule {
}
