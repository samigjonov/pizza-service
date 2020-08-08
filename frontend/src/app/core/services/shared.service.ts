import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private cartSource = new BehaviorSubject(false);
  public card = this.cartSource.asObservable();

  private userSource = new BehaviorSubject(null);
  public user = this.userSource.asObservable();

  public toggleCart() {
    this.cartSource.next(!this.cartSource.value);
  }

  public updateUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userSource.next(null);
  }

  public removeUser() {
    localStorage.removeItem('user');
    this.userSource.next(null);
  }

}
