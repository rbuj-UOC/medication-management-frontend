export class AuthDTO {
  user_id: string;
  user_role: string;
  access_token: string;
  username: string;
  password: string;

  constructor(
    user_id: string,
    user_role: string,
    access_token: string,
    username: string,
    password: string
  ) {
    this.user_id = user_id;
    this.user_role = user_role;
    this.access_token = access_token;
    this.username = username;
    this.password = password;
  }
}
