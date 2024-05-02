import { Repository, type DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner,
    );
  }

  public async findById(id: number): Promise<User | undefined> {
    return await this.findOneBy({ id });
  }

  public async deleteById(id: number): Promise<DeleteResult> {
    return await this.delete({ id });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOneBy({ email });
  }
}
