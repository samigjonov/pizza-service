import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  public constructor(private httpClient: HttpClient) {

  }

  public getPizzas() {
    return this.httpClient.get('/api/pizzas');
  }
}
