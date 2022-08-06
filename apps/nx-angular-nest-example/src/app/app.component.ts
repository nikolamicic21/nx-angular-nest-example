import { Component, Inject, OnInit } from '@angular/core';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-angular-nest-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private router: Router,
    private oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth
      .signInWithRedirect()
      .then(() => this.router.navigate(['/']));
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
