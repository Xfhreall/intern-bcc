export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export interface OtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

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

export interface UserRegistrationData {
  email: string;
  name?: string;
  password?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
