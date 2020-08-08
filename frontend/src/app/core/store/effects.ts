import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './actions';
import { PizzaService } from "../services/pizza.service";
import { RateService } from "../services/rate.service";

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: PizzaService,
    private rateService: RateService
  ) {
  }

  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(ActionTypes.LoadItems),
    mergeMap(() =>
      this.pizzaService.getPizzas().pipe(
        map((pizzas: any) => {
          return {type: ActionTypes.LoadSuccess, payload: pizzas.data};
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  loadCurrency$ = this.actions$.pipe(
    ofType(ActionTypes.LoadCurrency),
    mergeMap(() =>
      this.rateService.getRate().pipe(
        map((rate: any) => {
          return {type: ActionTypes.RateSuccess, payload: rate.eur};
        }),
        catchError(() => EMPTY)
      )
    )
  );
}
