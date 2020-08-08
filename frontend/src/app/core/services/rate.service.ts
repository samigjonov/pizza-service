import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RateService {
  public constructor(private httpClient: HttpClient) {
  }

  public getRate() {
    return this.httpClient.get('/api/rate');
  }
}
