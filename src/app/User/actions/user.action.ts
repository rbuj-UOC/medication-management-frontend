import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';

export const deleteUser = createAction('[Profile Page] Delete user');
export const deleteUserSuccess = createAction(
  '[Profile Page] Delete user Success'
);
export const deleteUserFailure = createAction(
  '[Profile Page] Delete user Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUserByUserId = createAction(
  '[UserList Page] Delete user',
  props<{ userId: string }>()
);
export const deleteUserByUserIdSuccess = createAction(
  '[UserList Page] Delete user Success',
  props<{ userId: string }>()
);
export const deleteUserByUserIdFailure = createAction(
  '[UserList Page] Delete user Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUser = createAction('[Profile Page] Get user by ID');
export const getUserSuccess = createAction(
  '[Profile Page] Get user by ID Success',
  props<{ user: UserDTO }>()
);
export const getUserFailure = createAction(
  '[Profile Page] Get user by ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserByUserId = createAction(
  '[??? Page] Get user by ID',
  props<{ userId: string }>()
);
export const getUserByUserIdSuccess = createAction(
  '[??? Page] Get user by ID Success',
  props<{ userId: string; user: UserDTO }>()
);
export const getUserByUserIdFailure = createAction(
  '[??? Page] Get user by ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUsers = createAction('[UserList Page] Get user list');
export const getUsersSuccess = createAction(
  '[UserList Page] Get user list Success',
  props<{ users: UserDTO[] }>()
);
export const getUsersFailure = createAction(
  '[UserList Page] Get user list Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[User Service] Logout');

export const register = createAction(
  '[Register Page] Register new user',
  props<{ user: UserDTO }>()
);
export const registerSuccess = createAction(
  '[Register Page] Register new user Success',
  props<{ user: UserDTO }>()
);
export const registerFailure = createAction(
  '[Register Page] Register new user Failure',
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
