import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      return of(true);
    } else {
      return of(false);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
