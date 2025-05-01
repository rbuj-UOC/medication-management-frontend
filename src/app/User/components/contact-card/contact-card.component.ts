import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() removeUserContactRequest = new EventEmitter<string>();

  removeUserContact(email: string): void {
    const result = confirm('Confirm delete contact: ' + email);
    if (result) {
      this.removeUserContactRequest.emit(this.contact.email);
    }
  }
}
