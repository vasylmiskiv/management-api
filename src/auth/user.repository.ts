import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class UserRepository extends Repository<User> {
  // constructor(private dataSource: DataSource) {
  //   super(User, dataSource.createEntityManager());
  // }

  async getUserByUsername(username: string): Promise<User> {
    return await User.findOne({
      where: { username },
    });
  }

  async signUp(dto: AuthCredentialsDto): Promise<User> {
    const { email, username, password } = dto;

    const isUserExist = await User.findOne({
      where: { email },
    });

    if (isUserExist) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User();

    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt(10);
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();

      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(dto: AuthCredentialsDto): Promise<string> {
    const { email, password } = dto;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
