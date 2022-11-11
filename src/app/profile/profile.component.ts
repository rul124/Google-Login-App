import {Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  constructor(
    public accountService: AccountService,
    public router: Router,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    console.log("Hello!", this.accountService.isLoggedIn);
    if(!this.accountService.isLoggedIn) {
      this.router.navigate(['/login']).then();
    }
    // otherwise, it's logged in
    this.profile = this.accountService.profile;
    console.log("Profile is: ", this.profile);
  }

  signOut() {
    this.accountService.logOut();
    console.log(this.accountService.profile);
    this.zone.run(() => {
      this.router.navigate(['/profile']).then();
    });
  }
}
