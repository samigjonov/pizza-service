import { NgModule } from "@angular/core";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [MainRoutingModule, CommonModule],
  exports: [],
  declarations: [MainComponent, NavbarComponent, FooterComponent, HomeComponent]
})

export class MainModule {
}
