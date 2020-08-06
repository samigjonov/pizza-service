import { Component } from "@angular/core";
import { SharedService } from "../../../core/services/shared.service";
import { Store, select } from "@ngrx/store";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public isMobileMenuOpen = false;
  public count = 0;

  public constructor(private sharedService: SharedService, private store: Store<any>) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.count = data.cart.reduce((previousCount, item) => {
        return previousCount + item.quantity;
      }, 0)
    });
  }

  public openCart() {
    this.sharedService.toggleCart();
  }
}
