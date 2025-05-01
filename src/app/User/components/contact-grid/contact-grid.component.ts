import { Component, Input } from '@angular/core';
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

  constructor(private router: Router) {}

  addContact(): void {
    this.router.navigate(['user/contact/form']);
  }
}
