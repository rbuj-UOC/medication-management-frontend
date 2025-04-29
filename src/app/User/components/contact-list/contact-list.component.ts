import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDisplayIsMobile } from '../../../Display/display.selector';
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
  contacts: UserDTO[];
  displayedColumns: string[] = [
    'contact-name',
    'contact-surname_1',
    'contact-surname_2',
    'contact-alias',
    'contact-birth_date',
    'contact-email',
    'contact-actions'
  ];
  private user_id: string;
  isMobile = true;
  isMobile$: any;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.store.select(selectUserContacts).subscribe((contacts) => {
      this.contacts = contacts;
    });
    this.isMobile$ = this.store.select(selectDisplayIsMobile);
    this.isMobile$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
    this.loadUserContacts();
  }

  addContact(): void {
    this.router.navigate(['user/contact/form']);
  }

  private loadUserContacts(): void {
    this.store.dispatch(UserAction.getUserContacts());
  }

  removeUserContact(email: string): void {
    const result = confirm('Confirm delete medication: ' + email);
    if (result) {
      this.store.dispatch(UserAction.removeUserContact({ email }));
    }
  }
}
