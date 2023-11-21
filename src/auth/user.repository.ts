import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
