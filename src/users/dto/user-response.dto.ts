import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 4 })
  id: number;

  @ApiProperty({ example: 'muca960403@hotmail.com' })
  email: string;

  @ApiProperty({ example: '2024-05-02T05:26:52.439Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-05-02T05:26:52.439Z' })
  updatedAt: string;
}
