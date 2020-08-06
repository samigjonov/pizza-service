import { Component } from "@angular/core";
import { SharedService } from "../../core/services/shared.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  public isCartOpen = false;

  public constructor(private sharedService: SharedService) {
    this.sharedService.card.subscribe(currentValue => this.isCartOpen = currentValue);
  }

  public toggleCart() {
    this.sharedService.toggleCart();
  }


}
