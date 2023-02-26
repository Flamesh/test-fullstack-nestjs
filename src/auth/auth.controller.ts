import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.services';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/users.entity';
import { User } from 'src/auth/user.decorator';
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  @UseGuards(AuthGuard())
  async getUser(@User() user: UserEntity) {
    return this.authService.getUser(user);
  }

  @Post('/register')
  register(@Body(ValidationPipe) user: RegisterDTO) {
    return this.authService.register(user);
  }

  @Post('/login')
  login(@Body(ValidationPipe) user: LoginDTO) {
    return this.authService.login(user);
  }
}
