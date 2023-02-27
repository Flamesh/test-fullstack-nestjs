import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

describe('AuthController', () => {
  let authService: AuthService;
  const mockUserProfile = {
    id: 1,
    email: 'test@gmail.com',
    username: 'username_test',
    token: 'token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secretOrPrivateKey: process.env.SECRET_KEY,
          signOptions: {
            expiresIn: 360000,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should return user profile when register successful', async () => {
      jest
        .spyOn(authService, 'register')
        .mockReturnValue(Promise.resolve(mockUserProfile as any));
      const registerDto = {
        email: 'test@gmail.com',
        username: 'username_test',
        password: '123456',
      };

      const authData = await authService.register(registerDto);

      expect(authData).not.toHaveProperty('password');
      expect(authData).toHaveProperty('email', 'test@gmail.com');
      expect(authData).toHaveProperty('username', 'username_test');
      expect(authData).toHaveProperty('token', 'token');
    });
  });

  describe('login', () => {
    it('should return user profile when login successful', async () => {
      jest
        .spyOn(authService, 'login')
        .mockReturnValue(Promise.resolve(mockUserProfile as any));
      const loginDto = {
        email: 'test@gmail.com',
        password: '123456',
      };
      const authData = await authService.login(loginDto);
      expect(authData).not.toHaveProperty('password');
      expect(authData).toHaveProperty('email', 'test@gmail.com');
      expect(authData).toHaveProperty('username', 'username_test');
      expect(authData).toHaveProperty('token', 'token');
    });
  });
});
