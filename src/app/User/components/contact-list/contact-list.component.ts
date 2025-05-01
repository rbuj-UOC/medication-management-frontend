import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayIsMobile } from '../../../Display/selectors';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import { selectUserContacts } from '../../selectors';

@Component({
  selector: 'app-contact-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts$: Observable<UserDTO[]>;
  isMobile$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.contacts$ = this.store.select(selectUserContacts);
    this.isMobile$ = this.store.select(selectDisplayIsMobile);
    this.loadUserContacts();
  }

  private loadUserContacts(): void {
    this.store.dispatch(UserAction.getUserContacts());
  }

  removeUserContact(email: string): void {
    this.store.dispatch(UserAction.removeUserContact({ email }));
  }
}
