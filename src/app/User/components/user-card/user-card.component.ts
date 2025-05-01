import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-user-card',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: UserDTO;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  deleteUser(): void {
    const result = confirm('Confirm delete medication: ' + this.user.email);
    if (result) {
      this.store.dispatch(
        UserAction.deleteUserByUserId({ userId: this.user.id })
      );
    }
  }

  editUser(): void {
    this.router.navigate(['user/edit/' + this.user.id]);
  }
}
