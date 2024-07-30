import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgIf, LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login and navigate on successful login', () => {
    const username = 'testuser';
    const password = 'password';
    const response = true;

    component.model.username = username;
    component.model.password = password;
    mockAuthService.login.and.returnValue(of(response));
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    component.onSubmit();
    fixture.detectChanges();

    expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
    expect(component.error).toBe('');
  });

  it('should set error message on login failure', () => {
    const username = 'testuser';
    const password = 'password';
    const response = false;

    component.model.username = username;
    component.model.password = password;
    mockAuthService.login.and.returnValue(of(response));

    component.onSubmit();
    fixture.detectChanges();

    expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
    expect(component.error).toBe('Username or password is incorrect');
  });

  it('should set error message on login error', () => {
    const username = 'testuser';
    const password = 'password';
    const errorResponse = 'Network error';

    component.model.username = username;
    component.model.password = password;
    mockAuthService.login.and.returnValue(throwError(() => new Error(errorResponse)));

    component.onSubmit();
    fixture.detectChanges();

    expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
    expect(component.error).toBe('An error occurred during login');
  });
});
