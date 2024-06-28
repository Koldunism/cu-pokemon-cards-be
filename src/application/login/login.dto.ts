export interface LoginInput {
  username: string
  passwordHash: string
}

export interface LoginOutput {
  token: string
}
