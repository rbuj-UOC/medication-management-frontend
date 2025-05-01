import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDisplayIsMobile } from '../../../Display/display.selector';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import { selectUsers } from '../../selectors';

@Component({
  selector: 'app-user-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: UserDTO[];
  isMobile = true;
  isMobile$: any;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.isMobile$ = this.store.select(selectDisplayIsMobile);
    this.isMobile$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
    this.store.select(selectUsers).subscribe((users) => {
      this.users = users;
    });
    this.loadUsers();
  }

  private loadUsers(): void {
    this.store.dispatch(UserAction.getUsers());
  }
}
