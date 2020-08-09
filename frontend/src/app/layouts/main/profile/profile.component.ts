import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../../core/services/shared.service";
import { Router } from "@angular/router";
import { Order } from "../../../core/models/order.model";
import { OrderService } from "../../../core/services/order.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public orders: Order[] = [];
  public loading = false;

  public constructor(private sharedService: SharedService, private router: Router,
                     private orderService: OrderService) {
  }

  public async ngOnInit() {
    this.loading = true;
    try {
      this.orders = (await this.orderService.getOrders()).data;
    } finally {
      this.loading = false;
    }
  }
}
