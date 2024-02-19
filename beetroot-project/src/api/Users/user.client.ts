import { apiRequest } from "../Api";
import { LoginInput, RegisterInput, User, SetPasswordInput, SetPasswordResponse } from "./user";

export const login = async (data: LoginInput) =>
  apiRequest<{ credentials: LoginInput }, { token: string }>({
    method: "POST",
    url: "api/auth",
    data: { credentials: data },
  });
  

export const register = async (data: RegisterInput) =>
  apiRequest<{ user: RegisterInput }, User>({
    method: "POST",
    url: "api/users",
    data: { user: data },
  });

export const resetPassword = async (data: SetPasswordInput, token: string) =>
  apiRequest<SetPasswordInput, SetPasswordResponse>({
    method: "POST",
    url: `auth/reset-password`,
    data,
    params: {
      token,
    },
  });

export const getUserDetails = async () => apiRequest<undefined, User>({ method: "GET", url: "users/me" });
