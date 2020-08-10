import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { ShopReducer } from "./core/store/reducer";
import { EffectsModule } from "@ngrx/effects";
import { ShopEffects } from "./core/store/effects";
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({shop: ShopReducer}),
    EffectsModule.forRoot([ShopEffects])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
