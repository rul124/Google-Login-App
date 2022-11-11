import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isLoggedIn: boolean = false;
  profile: any = {}
  constructor() { }

  public isLoggedInStatus(): boolean {
    return this.isLoggedIn;
  }

  public logIn(profile: any, token: string): void {
    if(this.isLoggedIn) {
      return;
    }
    this.isLoggedIn = true;
    this.profile['Token'] = token;
    this.profile['ID'] = profile.getId();
    this.profile['Name'] = profile.getName();
    this.profile['Image URL'] = profile.getImageUrl();
    this.profile['Email'] = profile.getEmail();
  }

  public logOut(): void {
    this.isLoggedIn = false;
    this.profile = {}
  }
}
