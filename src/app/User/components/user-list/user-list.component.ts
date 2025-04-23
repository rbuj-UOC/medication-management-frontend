import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  displayedColumns: string[] = [
    'user-name',
    'user-surname_1',
    'user-surname_2',
    'user-alias',
    'user-birth_date',
    'user-email',
    'user-role',
    'user-actions'
  ];
  private user_id: string;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.store.select(selectUsers).subscribe((users) => {
      this.users = users;
    });
    this.loadUsers();
  }

  private loadUsers(): void {
    this.store.dispatch(UserAction.getUsers());
  }

  deleteUser(userId: string, email: string): void {
    const result = confirm('Confirm delete medication: ' + email);
    if (result) {
      this.store.dispatch(UserAction.deleteUserByUserId({ userId }));
    }
  }
}
