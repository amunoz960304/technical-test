import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un usuario',
  })
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtiene un listado de usuarios',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtiene un usuario por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id Usuario',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualiza un usuario por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id usuario',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Elimina un usuario por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id usuario',
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
