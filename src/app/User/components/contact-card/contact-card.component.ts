import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-contact-card',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() contact: UserDTO;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  removeUserContact(email: string): void {
    const result = confirm('Confirm delete contact: ' + email);
    if (result) {
      this.store.dispatch(UserAction.removeUserContact({ email }));
    }
  }
}
