import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Pizza } from "../../../core/models/pizza.model";
import { SharedService } from "../../../core/services/shared.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SwalService } from "../../../core/services/swal.service";
import { Router } from "@angular/router";
import { ClearCart } from "../../../core/store/actions";
import { OrderService } from "../../../core/services/order.service";
import { RateService } from "../../../core/services/rate.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  public cartItems: [{ item: Pizza, quantity: number }];
  public totalPrice = 0;
  public count = 0;
  public checkoutForm: FormGroup;
  public deliveryCost = 10;
  public rate = 1;

  public constructor(private sharedService: SharedService, private store: Store<any>,
                     private swalService: SwalService, private orderService: OrderService,
                     private router: Router,
                     public rateService: RateService) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.cartItems = data.cart;
      this.totalPrice = this.cartItems.reduce((previousPrice, item) => {
        return previousPrice + (item.quantity * item.item.price)
      }, 0);
      this.count = this.cartItems.reduce((previousValue, item) => {
        return previousValue + item.quantity;
      }, 0);
    });
    const user = JSON.parse(localStorage.getItem('user')) || null;
    this.checkoutForm = new FormGroup({
      firstName: new FormControl(user ? user.firstName : null, Validators.required),
      lastName: new FormControl(user ? user.lastName : null, Validators.required),
      email: new FormControl(user ? user.email : null, [Validators.required, Validators.email]),
      address: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(user ? user.phoneNumber : null, Validators.required)
    });
    this.rate = this.rateService.getCurrentRate();
  }

  public async onSubmit() {
    this.swalService.showConfirmDialog().then(async (result) => {
      if (result.value) {
        try {
          const sendingItems = this.cartItems.reduce((previousValue, item) => {
            previousValue[item.item._id] = item.quantity;
            return previousValue;
          }, {});
          const sendingValue = {
            ...this.checkoutForm.getRawValue(),
            items: sendingItems,
            price: {
              usd: this.totalPrice.toFixed(2),
              eur: (this.totalPrice * this.rate).toFixed(2)
            }
          };
          await this.orderService.createOrder(sendingValue);
          this.swalService.showBasicAlert();
          this.store.dispatch(new ClearCart());
          this.router.navigate(['/']);
        } catch (e) {
          this.swalService.showErrorAlert();
        }
      }
    });
  }

  public get firstName() {
    return this.checkoutForm.get('firstName');
  }

  public get lastName() {
    return this.checkoutForm.get('lastName');
  }

  public get email() {
    return this.checkoutForm.get('email');
  }

  public get address() {
    return this.checkoutForm.get('address');
  }

  public get phoneNumber() {
    return this.checkoutForm.get('phoneNumber');
  }

}
