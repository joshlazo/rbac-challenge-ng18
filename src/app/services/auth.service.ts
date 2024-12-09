import { Injectable } from '@angular/core';
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setLocalStorage(responseObj: any, role: any) {
    localStorage.setItem('token', responseObj.token);
    localStorage.setItem('isAdmin', JSON.stringify(role));

    const expiresAt = moment().add(10, 'minutes');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration(), "second");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } else {
      return moment();
    }
  }
}
