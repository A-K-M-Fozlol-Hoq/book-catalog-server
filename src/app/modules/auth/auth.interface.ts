export type ILoginUser = {
  email: string;
  password: string;
};

export type ISignupUserResponse = {
  accessToken?: string;
  password?: string;
  email?: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  password?: string;
  email?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  email: string;
};
