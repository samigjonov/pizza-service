import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  public constructor(private httpClient: HttpClient) {
  }

  public createOrder(checkoutForm: any) {
    return this.httpClient.post('/api/order', checkoutForm).toPromise();
  }

  public getOrders(): any {
    return this.httpClient.get('/api/orders').toPromise();
  }
}

