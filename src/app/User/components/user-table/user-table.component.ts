import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-user-table',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input() users: UserDTO[] = [];
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

  constructor(
    private router: Router,
    private store: Store
  ) {}

  deleteUser(userId: string, email: string): void {
    const result = confirm('Confirm delete medication: ' + email);
    if (result) {
      this.store.dispatch(UserAction.deleteUserByUserId({ userId }));
    }
  }

  editUser(userId: string): void {
    this.router.navigate(['user/edit/' + userId]);
  }
}
