import { authConfig } from '../auth.config';
import { Component, OnInit } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    loginFailed: boolean = false;
    userProfile: object;

    constructor(private oauthService: OAuthService) {
    }

    login() {
        this.oauthService.initImplicitFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    get givenName() {
        var claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims['given_name'];
    }

    get familyName() {
        var claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims['family_name'];
    }

    loadUserProfile(): void {
        this
            .oauthService
            .loadUserProfile()
            .then(up => this.userProfile = up);
    }

    
    testSilentRefresh() {
        /*
         * Tweak config for implicit flow.
         * This is needed b/c this sample uses both flows
        */
        //this.oauthService.clientId = "spa-demo";
        this.oauthService.oidc = true;

        this
            .oauthService
            .silentRefresh()
            .then(info => console.debug('refresh ok', info))
            .catch(err => console.error('refresh error', err));
    }

    set requestAccessToken(value: boolean) {
        this.oauthService.requestAccessToken = value;
        localStorage.setItem('requestAccessToken', '' + value);
    }

    get requestAccessToken() {
        return this.oauthService.requestAccessToken;
    }

    get id_token() {
        return this.oauthService.getIdToken();
    }

    get access_token() {
        return this.oauthService.getAccessToken();
    }

    get id_token_expiration() {
        return this.oauthService.getIdTokenExpiration();
    }

    get access_token_expiration() {
        return this.oauthService.getAccessTokenExpiration();
    }



    ngOnInit() { 
        
            // this.oauthService.initImplicitFlow('some-state');
            /*
            this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
                if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
                  this.oauthService.initImplicitFlow('some-state');
                }
            });
            */
        
    }

}