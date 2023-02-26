import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { UserEntity } from 'src/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity, UserEntity]), AuthModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BookModule {}
