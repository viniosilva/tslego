import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException as NestNotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserInput } from './dto/User';
import { NotFoundException } from './exception/NotFoundException';
import { UserService } from './UserService';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Returns the users' })
  @ApiOkResponse({ description: 'Successful operation', type: [User] })
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Returns found user by id' })
  @ApiOkResponse({ description: 'Successful operation', type: User })
  @ApiNotFoundResponse({ description: 'Not found' })
  getUserById(@Param('userId') userId: number): User {
    try {
      return this.userService.getUserById(userId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NestNotFoundException(err.message);
      } else throw err;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'Successful operation', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userInput: UserInput): User {
    return this.userService.createUser(userInput);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ description: 'Successful operation', type: User })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  updateUserById(
    @Param('userId') userId: number,
    @Body() userInput: UserInput,
  ): User {
    try {
      return this.userService.updateUserById(userId, userInput);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NestNotFoundException(err.message);
      } else throw err;
    }
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Remove found user by id' })
  @ApiNoContentResponse({ description: 'Successful operation' })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('userId') userId: number): void {
    this.userService.removeUserById(userId);
  }
}
