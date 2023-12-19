import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, AccessToken } from './jwt.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private userRepository: UserRepository,
    private jwtSerivce: JwtService,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<User> {
    return await this.userRepository.signUp(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(dto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtSerivce.sign(payload);

    this.logger.debug(`Generated JWT with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }
}
