import { Component, OnInit } from '@angular/core';
import { GetCurrency, GetItems } from './core/store/actions';
import { Store } from '@ngrx/store';
import { AuthService } from "./core/services/auth.service";
import { SharedService } from "./core/services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pizza service';

  public constructor(private store: Store,
                     private authService: AuthService,
                     private sharedService: SharedService) {
  }

  public async ngOnInit() {
    this.store.dispatch(new GetItems());
    this.store.dispatch(new GetCurrency());
    try {
      await this.authService.getProfile();
    } catch (e) {
      this.sharedService.removeUser();
    }
  }

}
