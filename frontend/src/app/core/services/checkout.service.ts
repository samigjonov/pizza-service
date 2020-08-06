import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  public constructor(private httpClient: HttpClient) {
  }

  public createOrder(checkoutForm: any) {
    return this.httpClient.post('/api/main', checkoutForm).toPromise();
  }
}

