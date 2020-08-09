import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public constructor(private httpClient: HttpClient,
                     private router: Router,
                     private sharedService: SharedService) {
  }

  public login(loginData: any): Promise<any> {
    return this.httpClient.post('/api/login', loginData).toPromise();
  }

  public signUp(signUpData: any): Promise<any> {
    return this.httpClient.post('/api/signup', signUpData).toPromise();
  }

  public getProfile(): Promise<any> {
    return this.httpClient.get('/api/profile').toPromise();
  }

  public logout() {
    this.sharedService.removeUser();
    this.router.navigate(['/']);
  }
}
