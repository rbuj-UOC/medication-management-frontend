import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-user-grid',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent {
  @Input() users: UserDTO[] = [];

  constructor(private router: Router) {}
}
