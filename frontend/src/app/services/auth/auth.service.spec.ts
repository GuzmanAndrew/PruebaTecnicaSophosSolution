import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true and set loggedIn to true for correct credentials', (done) => {
    service.login('admin', 'admin').subscribe(result => {
      expect(result).toBeTrue();
      expect(service.isLoggedIn()).toBeTrue();
      done();
    });
  });

  it('should return false and set loggedIn to false for incorrect credentials', (done) => {
    service.login('user', 'password').subscribe(result => {
      expect(result).toBeFalse();
      expect(service.isLoggedIn()).toBeFalse();
      done();
    });
  });

  it('should set loggedIn to false on logout', () => {
    // First, log in with correct credentials
    service.login('admin', 'admin').subscribe(() => {
      // Now log out
      service.logout();
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  it('should return true for isLoggedIn after a successful login', (done) => {
    service.login('admin', 'admin').subscribe(() => {
      expect(service.isLoggedIn()).toBeTrue();
      done();
    });
  });

  it('should return false for isLoggedIn after a logout', () => {
    service.login('admin', 'admin').subscribe(() => {
      service.logout();
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});
