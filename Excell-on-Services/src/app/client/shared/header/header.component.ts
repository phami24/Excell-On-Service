import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../State/index';
import * as fromUser from '../../../State/client';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedOut!: boolean;
  userEmail$: Observable<string> = new Observable();
  constructor(
    private store: Store<fromRoot.IAppState>,
    private router: Router,
    private toastr: ToastrService,
  ) {
    
  }

  ngOnInit(): void {
    initFlowbite();
    this.userEmail$ = this.store.select(fromUser.getUserEmail);
    
    this.store.select(fromUser.getIsLoggedOut).subscribe((isLoggedOut) => {
      this.isLoggedOut = isLoggedOut;
    });
  }
  logout() {
    const confirmLogout = confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      this.toastr.success('Logout Successfully!', 'Success');
      this.store.dispatch(new fromUser.Logout());
      this.router.navigate(['/home']);
    }
  }
}
