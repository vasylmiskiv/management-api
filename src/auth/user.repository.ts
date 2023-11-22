import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export class UserRepository extends Repository<User> {
  // constructor(private dataSource: DataSource) {
  //   super(User, dataSource.createEntityManager());
  // }

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    const { email, username, password } = dto;

    console.log(dto);

    const exists = await this.findOne({
      where: { email },
    });

    if (exists) {
      throw new Error('User with this email already exists');
    }

    const user = new User();

    user.username = username;
    user.password = password;
    user.email = email;

    await user.save();
  }
}
