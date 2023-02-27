import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { RegisterDTO } from 'src/models/user.dto';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  const mockUserProfile = {
    id: 1,
    email: 'test@gmail.com',
    username: 'username',
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

    controller = module.get(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call register service when call register controller', async () => {
      jest
        .spyOn(authService, 'register')
        .mockResolvedValue(mockUserProfile as any);

      const registerDto: RegisterDTO = {
        email: 'test@gmail.com',
        username: 'username',
        password: 'bar',
      };
      const res = await controller.register(registerDto);
      expect(res).not.toHaveProperty('password');
      expect(res).toEqual(mockUserProfile);
    });
  });

  describe('login', () => {
    it('should call login service when call login controller', async () => {
      jest
        .spyOn(authService, 'login')
        .mockResolvedValue(mockUserProfile as any);

      const res = await controller.login({
        email: 'test@gmail.com',
        password: '123456',
      });

      expect(res).not.toHaveProperty('password');
      expect(res).toEqual(mockUserProfile);
    });
  });
});
