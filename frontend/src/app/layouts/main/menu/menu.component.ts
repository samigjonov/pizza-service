import { Component, OnInit } from "@angular/core";
import { Pizza } from "../../../core/models/pizza.model";
import { Store, select } from "@ngrx/store";
import { AddToCart } from "../../../core/store/actions";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public pizzas: Pizza[];

  constructor(private store: Store<any>) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.pizzas = data.items;
    });
  }

  ngOnInit() {
  }

  public addToCart(pizza: Pizza) {
    this.store.dispatch(new AddToCart(pizza));
  }

}
