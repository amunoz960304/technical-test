import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';

type AuthSuccess = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtTokenService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<AuthSuccess> {
    const { password: pwd, ...user } =
      await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, pwd);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.jwtTokenService.signAsync(user);

    return { token };
  }
}
