import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayIsMobile } from '../../../Display/selectors';
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
export class UserListComponent implements OnInit {
  store = inject(Store);
  selectUsers$: Observable<UserDTO[] | null> = this.store.select(selectUsers);
  isMobile$: Observable<boolean> = this.store.select(selectDisplayIsMobile);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(UserAction.getUsers());
  }

  deleteUser(userId: string): void {
    this.store.dispatch(UserAction.deleteUserByUserId({ userId }));
  }

  editUser(userId: string): void {
    this.router.navigate(['user/edit/' + userId]);
  }
}
