import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-user-table',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input() users: UserDTO[] = [];
  @Output() deleteUserRequest = new EventEmitter<string>();
  @Output() editUserRequest = new EventEmitter<string>();

  displayedColumns: string[] = [
    'user-surname_1',
    'user-surname_2',
    'user-name',
    'user-alias',
    'user-birth_date',
    'user-email',
    'user-role',
    'user-actions'
  ];

  deleteUser(userId: string, email: string): void {
    const result = confirm('Confirm delete medication: ' + email);
    if (result) {
      this.deleteUserRequest.emit(userId);
    }
  }

  editUser(userId: string): void {
    this.editUserRequest.emit(userId);
  }
}
