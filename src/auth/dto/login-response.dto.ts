import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtdWNhOTYwNDAzQGhvdG1haWwuY29tbW1tIiwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wMlQwNToyNjo1Mi40MzlaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wMlQwNToyNjo1Mi40MzlaIiwiaWF0IjoxNzE0NjI5MTE5LCJleHAiOjE3MTQ2MzI3MTl9.IZE-jNlPd3lopvNyRWCRlV3khrSh5Q6odD6js8Wb-HU',
  })
  token: string;
}
