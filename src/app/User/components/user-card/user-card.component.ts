import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-user-card',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: UserDTO;
  @Output() deleteUserRequest = new EventEmitter<string>();
  @Output() editUserRequest = new EventEmitter<string>();

  deleteUser(): void {
    const result = confirm('Confirm delete medication: ' + this.user.email);
    if (result) {
      this.deleteUserRequest.emit(this.user.id);
    }
  }

  editUser(): void {
    this.editUserRequest.emit(this.user.id);
  }
}
