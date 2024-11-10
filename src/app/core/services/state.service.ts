import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public authState : any = {
    id : undefined,
    isAuthenticated : false,
    username : undefined,
    role : undefined,
    token: undefined,
    mail: undefined
  }

  constructor() {
    this.loadToken();
  }

  loadToken() {
    const token = localStorage!.getItem('token');
    if (token) {
      const decodedJwt: any = jwtDecode(token);
      this.authState={
        isAuthenticated: true,
        username: decodedJwt.sub,
        id: decodedJwt.id,
        role: decodedJwt.auth,
        token: token
      };
    }
  }
  public setAuthState(state : any){
    this.authState = {...this.authState, ...state};
  }
}
