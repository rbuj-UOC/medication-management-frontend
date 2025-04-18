import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() deleteUserRequest = new EventEmitter<string>();
  @Output() editUserRequest = new EventEmitter<string>();

  editUser(userId: string): void {
    this.editUserRequest.emit(userId);
  }

  deleteUser(userId: string): void {
    this.deleteUserRequest.emit(userId);
  }
}
