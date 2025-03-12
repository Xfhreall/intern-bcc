//register
export interface RegisterPayload {
  email: string;
  password?: string;
}

export interface RegisterResponse {
  message: string;
}

//otp
export interface OtpPayload {
  email: string;
  otp: string;
}

export interface OtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface OtpVerificationFormProps {
  onSuccess?: () => void;
}

//login
export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

//forgot password
export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordParams {
  resetToken: string;
  newPassword: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
