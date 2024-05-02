import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const isExist = await this.usersRepository.findByEmail(createUserDto.email);

    if (isExist) {
      throw new BadRequestException('El usuario que intentas crear ya existe.');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const { password, ...user } =
      await this.usersRepository.save(createUserDto);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    if (users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios');
    }

    users.map((user) => delete user.password);

    return users;
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const { password, ...user } = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con el id ${id}`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<Omit<User, 'password'>> {
    const { password, ...user } = await this.usersRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new NotFoundException(
        `No se encontro el usuario con el email ${email}`,
      );
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const { password, ...updatedUser } = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  remove(id: number): boolean {
    this.usersRepository.deleteById(id);
    return true;
  }
}
