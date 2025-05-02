import { Component, inject, OnInit } from '@angular/core';
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
export class ContactListComponent implements OnInit {
  store = inject(Store);
  contacts$: Observable<UserDTO[] | null> =
    this.store.select(selectUserContacts);
  isMobile$: Observable<boolean> = this.store.select(selectDisplayIsMobile);

  ngOnInit(): void {
    this.store.dispatch(UserAction.getUserContacts());
  }

  removeUserContact(email: string): void {
    this.store.dispatch(UserAction.removeUserContact({ email }));
  }
}
