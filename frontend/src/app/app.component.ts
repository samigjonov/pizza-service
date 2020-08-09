import { Component, OnInit } from '@angular/core';
import { GetCurrency, GetItems } from './core/store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pizza service';

  public constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetItems());
    this.store.dispatch(new GetCurrency());
  }

}
