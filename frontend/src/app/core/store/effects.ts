import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './actions';
import { PizzaService } from "../services/pizza.service";

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: PizzaService
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
}
