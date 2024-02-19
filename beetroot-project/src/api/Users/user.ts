export interface User {
    birthday: string;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone: number;
    token: string;
    updated_at: string;
    username: string;
    permissions: string[];
  }
  export interface LoginRegisterResponse {
    success: string;
    user: User;
  }
  
  export interface RegisterInput {
    email: string;
    password: string;
    passwordConfirmation: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface FacebookLoginInput {
    email: string;
    password: string;
  }
  
  export interface SetPasswordInput {
    new_password: string;
    confirm_password: string;
  }
  
  export interface SetPasswordResponse {
    message: string;
  }
  