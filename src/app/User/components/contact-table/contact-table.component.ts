import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-contact-table',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {
  @Input() contacts: UserDTO[] = [];
  displayedColumns: string[] = [
    'contact-name',
    'contact-surname_1',
    'contact-surname_2',
    'contact-alias',
    'contact-birth_date',
    'contact-email',
    'contact-actions'
  ];

  constructor(
    private router: Router,
    private store: Store
  ) {}

  addContact(): void {
    this.router.navigate(['user/contact/form']);
  }

  removeUserContact(email: string): void {
    const result = confirm('Confirm delete contact: ' + email);
    if (result) {
      this.store.dispatch(UserAction.removeUserContact({ email }));
    }
  }
}
