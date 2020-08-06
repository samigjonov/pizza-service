import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Pizza } from "../../../core/models/pizza.model";
import { SharedService } from "../../../core/services/shared.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SwalService } from "../../../core/services/swal.service";
import { CheckoutService } from "../../../core/services/checkout.service";
import { Router } from "@angular/router";
import { ClearCart } from "../../../core/store/actions";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  public cartItems: [{ item: Pizza, quantity: number }];
  public totalPrice: number = 0;
  public count: number = 0;
  public checkoutForm: FormGroup;

  public constructor(private sharedService: SharedService, private store: Store<any>,
                     private swalService: SwalService, private checkoutService: CheckoutService,
                     private router: Router) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.cartItems = data.cart;
      this.totalPrice = this.cartItems.reduce((previousPrice, item) => {
        return previousPrice + (item.quantity * item.item.price)
      }, 0);
      this.count = this.cartItems.reduce((previousValue, item) => {
        return previousValue + item.quantity;
      }, 0);
    });
    this.checkoutForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, Validators.required)
    })
  }

  public async onSubmit() {
    this.swalService.showConfirmDialog().then(async (result) => {
      if (result.value) {
        try {
          await this.checkoutService.createOrder(this.checkoutForm.getRawValue());
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

}
