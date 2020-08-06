import { Component } from "@angular/core";
import { SharedService } from "../../../core/services/shared.service";
import { Pizza } from "../../../core/models/pizza.model";
import { Store, select } from "@ngrx/store";
import { AddToCart, RemoveFromCart, RemoveItem } from "../../../core/store/actions";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent {
  public cartItems: [{ item: Pizza, quantity: number }];
  public totalPrice: number = 0;

  public constructor(private sharedService: SharedService, private store: Store<any>) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.cartItems = data.cart;
      this.totalPrice = this.cartItems.reduce((previousPrice, item) => {
        return previousPrice + (item.quantity * item.item.price)
      }, 0)
    });
  }

  public toggleCart() {
    this.sharedService.toggleCart();
  }

  public addToCart(pizza: Pizza) {
    this.store.dispatch(new AddToCart(pizza))
  }

  public removeFromCart(pizza: Pizza) {
    this.store.dispatch(new RemoveFromCart(pizza))
  }

  public removeAllFromCart(pizza: Pizza) {
    this.store.dispatch(new RemoveItem(pizza))
  }

}
