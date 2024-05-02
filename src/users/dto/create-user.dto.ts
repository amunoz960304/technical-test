import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'muca960403@hotmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin123' })
  @MinLength(8, { message: 'El password debe contener al menos 8 caracteres' })
  password: string;
}
