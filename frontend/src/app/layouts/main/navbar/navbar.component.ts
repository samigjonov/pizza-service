import { Component } from "@angular/core";
import { SharedService } from "../../../core/services/shared.service";
import { Store, select } from "@ngrx/store";
import { User } from "../../../core/models/user.model";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public isMobileMenuOpen = false;
  public count = 0;
  public user: User;
  public isCurrencyChangerOpen = false;
  public currentCurrency = localStorage.getItem('currency');

  public constructor(private sharedService: SharedService, private store: Store<any>,
                     private authService: AuthService) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.count = data.cart.reduce((previousCount, item) => {
        return previousCount + item.quantity;
      }, 0)
    });
    this.sharedService.user.subscribe(() => {
      this.user = JSON.parse(localStorage.getItem('user')) || null;
    });
    this.user = JSON.parse(localStorage.getItem('user')) || null;
  }

  public openCart() {
    this.sharedService.toggleCart();
  }

  public reload() {
    localStorage.setItem('currency', this.currentCurrency === 'eur' ? 'usd' : 'eur');
    window.location.reload();
  }

  public logout() {
    this.authService.logout();
  }
}
