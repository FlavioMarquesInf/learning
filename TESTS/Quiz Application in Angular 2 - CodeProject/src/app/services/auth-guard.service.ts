import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  authState = new BehaviorSubject<any>(false);

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // console.log(route);

    this.userAuthService.user.subscribe(userData => {
      // console.log('AuthGuardService > canActivate?', userData);
      if (userData != null) {
        this.authState.next(true);
        return true;
      } else {
        this.router.navigate(['/login']);
        this.authState.next(false);
        return false;
      }
    });

    return true;

  }
}
