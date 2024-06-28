export interface UserParams {
  id?: number
  username: string
  passwordHash: string
}

export class User {
  id?: number
  username: string
  passwordHash: string

  constructor(params: UserParams) {
    ;(this.id = params.id), (this.username = params.username)
    this.passwordHash = params.passwordHash
  }
}
