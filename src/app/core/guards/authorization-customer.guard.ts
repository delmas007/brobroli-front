import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes} from '@angular/router';
import { Observable } from 'rxjs';
import {StateService} from "@services/state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard_SCOPE_CUSTOMER {
  constructor(private state:StateService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.state.authState.role == "SCOPE_CUSTOMER") {
      return true;
    } else {
      this.router.navigateByUrl("/notAuthorized");
      return false;
    }
  }
}
