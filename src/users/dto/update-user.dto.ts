import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ example: 'admin1234' })
  @MinLength(8, { message: 'El password debe contener al menos 8 caracteres' })
  password: string;
}
