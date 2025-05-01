import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-contact-grid',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './contact-grid.component.html',
  styleUrls: ['./contact-grid.component.scss']
})
export class ContactGridComponent {
  @Input() contacts: UserDTO[] = [];
  @Output() removeUserContactRequest = new EventEmitter<string>();

  constructor(private router: Router) {}

  addContact(): void {
    this.router.navigate(['user/contact/form']);
  }

  removeUserContact(email: string): void {
    this.removeUserContactRequest.emit(email);
  }
}
