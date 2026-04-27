export type AuthOutput = {
  user: {
    id: string
    email: string
  };
  accessToken: string
}

export type TokenOutput = {
  accessToken: string,
  refreshToken: string
}
