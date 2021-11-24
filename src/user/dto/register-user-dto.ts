import { UserStatuses } from '../../types';

export class RegisterUserDto {
  readonly name: string
  readonly password: string
}

export class LoginUserDto {
  readonly name: string
  readonly password: string
}

export class ChangeUserStatusDto {
  readonly userId: number
  readonly status: UserStatuses
}