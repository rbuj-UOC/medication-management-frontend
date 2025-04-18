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
  getUserContacts,
  getUserContactsFailure,
  getUserContactsSuccess,
  getUserFailure,
  getUserFormByUserId,
  getUserFormByUserIdFailure,
  getUserFormByUserIdSuccess,
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
  userForm: UserDTO;
  contacts: UserDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  users: new Array<UserDTO>(),
  user: new UserDTO('', '', '', '', new Date(), '', ''),
  userForm: new UserDTO('', '', '', '', new Date(), '', ''),
  contacts: new Array<UserDTO>(),
  loading: false,
  loaded: false,
  error: null
};

const _userReducer = createReducer(
  initialState,

  on(
    addUserContact,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    addUserContactSuccess,
    (state): UserState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    addUserContactFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    deleteUser,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    deleteUserSuccess,
    (state): UserState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    deleteUserFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    deleteUserByUserId,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    deleteUserByUserIdSuccess,
    (state, { userId }): UserState => ({
      ...state,
      users: [...state.users.filter((user) => user.id !== userId)],
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    deleteUserByUserIdFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getUser,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getUserSuccess,
    (state, action): UserState => ({
      ...state,
      user: action.user,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getUserFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getUserFormByUserId,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getUserFormByUserIdSuccess,
    (state, action): UserState => ({
      ...state,
      userForm: action.userForm,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getUserFormByUserIdFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getUserContacts,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getUserContactsSuccess,
    (state, action): UserState => ({
      ...state,
      contacts: action.contacts,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getUserContactsFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    getUsers,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    getUsersSuccess,
    (state, action): UserState => ({
      ...state,
      users: action.users,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    getUsersFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(logout, (): UserState => initialState),
  on(
    register,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    registerSuccess,
    (state): UserState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    registerFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    removeUserContact,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    removeUserContactSuccess,
    (state, { email }): UserState => ({
      ...state,
      contacts: [
        ...state.contacts.filter((contact) => contact.email !== email)
      ],
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    removeUserContactFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    updateUser,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    updateUserSuccess,
    (state, action): UserState => ({
      ...state,
      user: action.user,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    updateUserFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  ),
  on(
    updateUserDeviceToken,
    (state): UserState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null
    })
  ),
  on(
    updateUserDeviceTokenSuccess,
    (state, action): UserState => ({
      ...state,
      user: action.user,
      loading: false,
      loaded: true,
      error: null
    })
  ),
  on(
    updateUserDeviceTokenFailure,
    (state, { payload }): UserState => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload }
    })
  )
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
