import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.services';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(ValidationPipe) credentials: { user: RegisterDTO }) {
    return this.authService.register(credentials.user);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: { user: LoginDTO }) {
    return this.authService.login(credentials.user);
  }
}
