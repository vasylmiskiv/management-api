import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(dto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.signUp(dto);
  }
}
