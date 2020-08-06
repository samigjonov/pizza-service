import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private cartSource = new BehaviorSubject(false);
  public card = this.cartSource.asObservable();

  public toggleCart() {
    this.cartSource.next(!this.cartSource.value);
  }
}
