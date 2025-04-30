import { Action, createReducer, on } from '@ngrx/store';
import {
  addUserContact,
  addUserContactFailure,
  addUserContactSuccess,
  deleteUser,
  deleteUserByUserId,
  deleteUserByUserIdFailure,
  deleteUserByUserIdSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  getUser,
  getUserByUserId,
  getUserByUserIdFailure,
  getUserByUserIdSuccess,
  getUserContacts,
  getUserContactsFailure,
  getUserContactsSuccess,
  getUserFailure,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  getUserSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
  removeUserContact,
  removeUserContactFailure,
  removeUserContactSuccess,
  updateUser,
  updateUserDeviceToken,
  updateUserDeviceTokenFailure,
  updateUserDeviceTokenSuccess,
  updateUserFailure,
  updateUserSuccess
} from '../actions';
import { UserDTO } from '../models/user.dto';

export interface UserState {
  users: UserDTO[];
  user: UserDTO;
  contacts: UserDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  users: new Array<UserDTO>(),
  user: new UserDTO('', '', '', '', new Date(), '', ''),
  contacts: new Array<UserDTO>(),
  loading: false,
  loaded: false,
  error: null
};

const _userReducer = createReducer(
  initialState,

  on(addUserContact, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(addUserContactSuccess, (state, action) => ({
    ...state,
    contacts: action.contacts,
    loading: false,
    loaded: true,
    error: null
  })),
  on(addUserContactFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(deleteUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(deleteUserSuccess, (state) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null
  })),
  on(deleteUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(deleteUserByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(deleteUserByUserIdSuccess, (state, { userId }) => ({
    ...state,
    users: [...state.users.filter((user) => user.id !== userId)],
    loading: false,
    loaded: true,
    error: null
  })),
  on(deleteUserByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(getUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(getUserByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getUserByUserIdSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getUserByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(getUserContacts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getUserContactsSuccess, (state, action) => ({
    ...state,
    contacts: action.contacts,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getUserContactsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(getUsers, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(getUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    loading: false,
    loaded: true,
    error: null
  })),
  on(getUsersFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(logout, () => initialState),

  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(removeUserContact, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(removeUserContactSuccess, (state, { email }) => ({
    ...state,
    contacts: [...state.contacts.filter((contact) => contact.email !== email)],
    loading: false,
    loaded: true,
    error: null
  })),
  on(removeUserContactFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),

  on(updateUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(updateUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(updateUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  })),
  on(updateUserDeviceToken, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  })),
  on(updateUserDeviceTokenSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null
  })),
  on(updateUserDeviceTokenFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload }
  }))
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
