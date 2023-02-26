import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.services';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) user: RegisterDTO) {
    return this.authService.register(user);
  }

  @Post('/login')
  login(@Body(ValidationPipe) user: LoginDTO) {
    return this.authService.login(user);
  }
}
