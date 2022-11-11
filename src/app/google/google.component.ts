import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {
auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  constructor(
    public accountService: AccountService,
    public router: Router,
    private zone: NgZone,
  ) { }

  isLoggedIn: boolean = false;
  ngOnInit() {
    this.isLoggedIn = this.accountService.isLoggedIn;
    if(this.isLoggedIn) {
      this.router.navigate(['/profile']).then();
    }
    this.googleAuthSDK();
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();

        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.accountService.logIn(profile, googleAuthUser.getAuthResponse().id_token);
        console.log(this.accountService.profile, this.accountService.isLoggedIn);
        this.zone.run( () => {
          this.router.navigate(['/profile']).then();
        });
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '816408142656-lm3c7ilfm3ch2jea9780k9k9sf7i8h3k.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

}
