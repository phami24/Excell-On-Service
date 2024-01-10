import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';

import * as fromRoot from '../../State/index';
import * as fromUser from '../../State/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  loading$: Observable<boolean> = new Observable(); 
  success$: Observable<boolean> = new Observable();
  error$: Observable<boolean> = new Observable();
  userEmail$: Observable<string> = new Observable();
  destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.IAppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(fromUser.getLoadingLogin).pipe(takeUntil(this.destroy$));
    this.success$ = this.store.select(fromUser.getSuccessLogin).pipe(takeUntil(this.destroy$));
    this.error$ = this.store.select(fromUser.getFailLogin).pipe(takeUntil(this.destroy$));
    this.userEmail$ = this.store.select(fromUser.getUserEmail);

    this.onLoginSuccess();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(new fromUser.Login({ email, password }));
  }

  onLoginSuccess() {
    this.success$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.userEmail$.pipe(
        take(1)  
      ).subscribe(userEmail => {
        if (userEmail) {
          // Display or use userEmail as needed
          console.log('User Email:', userEmail);
        }
      });
      
      this.store.pipe(
        select(fromUser.getToken), 
        take(1)  
      ).subscribe(token => {
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        }
      });
    });
  }

  // New method for logging out
  logout() {
    this.store.dispatch(new fromUser.Logout());
    localStorage.removeItem('token'); 
    this.router.navigate(['/auth/login']); 
  }
}
