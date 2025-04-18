import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';

export const addUserContact = createAction(
  '[ContactForm Page] Add New User Contact',
  props<{ email: string }>()
);
export const addUserContactSuccess = createAction(
  '[ContactForm Page] Add New User Contact Success'
);
export const addUserContactFailure = createAction(
  '[ContactForm Page] Add New User Contact Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUser = createAction('[Profile Page] Delete User');
export const deleteUserSuccess = createAction(
  '[Profile Page] Delete User Success'
);
export const deleteUserFailure = createAction(
  '[Profile Page] Delete User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUserByUserId = createAction(
  '[UserList Page] Delete User',
  props<{ userId: string }>()
);
export const deleteUserByUserIdSuccess = createAction(
  '[UserList Page] Delete User Success',
  props<{ userId: string }>()
);
export const deleteUserByUserIdFailure = createAction(
  '[UserList Page] Delete User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUser = createAction('[Profile Page] Get User');
export const getUserSuccess = createAction(
  '[Profile Page] Get User Success',
  props<{ user: UserDTO }>()
);
export const getUserFailure = createAction(
  '[Profile Page] Get User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserContacts = createAction(
  '[ContactList Page] Get User Contact List'
);
export const getUserContactsSuccess = createAction(
  '[ContactList Page] Get User Contact List Success',
  props<{ contacts: UserDTO[] }>()
);
export const getUserContactsFailure = createAction(
  '[ContactList Page] Get User Contact List Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserFormByUserId = createAction(
  '[UserForm Page] Get User Form By Id',
  props<{ userId: string }>()
);
export const getUserFormByUserIdSuccess = createAction(
  '[UserForm Page] Get User Form By Id Success',
  props<{ userId: string; userForm: UserDTO }>()
);
export const getUserFormByUserIdFailure = createAction(
  '[UserForm Page] Get User Form By Id Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUsers = createAction('[UserList Page] Get User List');
export const getUsersSuccess = createAction(
  '[UserList Page] Get User List Success',
  props<{ users: UserDTO[] }>()
);
export const getUsersFailure = createAction(
  '[UserList Page] Get User List Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[User Service] Logout');

export const register = createAction(
  '[Register Page] Register New User',
  props<{ user: UserDTO }>()
);
export const registerSuccess = createAction(
  '[Register Page] Register New User Success',
  props<{ user: UserDTO }>()
);
export const registerFailure = createAction(
  '[Register Page] Register New User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const removeUserContact = createAction(
  '[ContactForm Page] Remove User Contact',
  props<{ email: string }>()
);
export const removeUserContactSuccess = createAction(
  '[ContactForm Page] Remove User Contact Success',
  props<{ email: string; contact: UserDTO }>()
);
export const removeUserContactFailure = createAction(
  '[ContactForm Page] Remove User Contact Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUser = createAction(
  '[Profile Page] Update User',
  props<{ user: UserDTO }>()
);
export const updateUserSuccess = createAction(
  '[Profile Page] Update User Success',
  props<{ user: UserDTO }>()
);
export const updateUserFailure = createAction(
  '[Profile Page] Update User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUserFormByUserId = createAction(
  '[UserForm Page] Update User Form By User Id',
  props<{ userId: string; userForm: UserDTO }>()
);
export const updateUserFormByUserIdSuccess = createAction(
  '[UserForm Page] Update User Form By User Id Success',
  props<{ userId: string; userForm: UserDTO }>()
);
export const updateUserFormByUserIdFailure = createAction(
  '[UserForm Page] Update User Form By User Id Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUserDeviceToken = createAction(
  '[App Component] Update User Device Token',
  props<{ device_token: string }>()
);
export const updateUserDeviceTokenSuccess = createAction(
  '[App Component] Update User Device Token Success',
  props<{ user: UserDTO }>()
);
export const updateUserDeviceTokenFailure = createAction(
  '[App Component] Update User Device Token Failure',
  props<{ payload: HttpErrorResponse }>()
);
