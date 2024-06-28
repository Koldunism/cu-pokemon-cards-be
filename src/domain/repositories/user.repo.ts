import { User } from '../entities'

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>
}
