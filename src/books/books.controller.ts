import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/users.entity';
import { CreateBookDTO, UpdateBookDTO } from 'src/models/book.dto';
import { OptionalAuthGuard } from 'src/auth/optional-auth.gaurd';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('')
  @UseGuards(AuthGuard(''))
  async findAll() {
    const books = await this.bookService.findAll();
    return { books };
  }

  @Get('/:slug')
  @UseGuards(new OptionalAuthGuard())
  async findBySlug(@Param('slug') slug: string) {
    const book = await this.bookService.findBySlug(slug);
    return { book };
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @User() user: UserEntity,
    @Body(ValidationPipe) data: CreateBookDTO,
  ) {
    const book = await this.bookService.createBook(user, data);
    return { book };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  async updateBook(
    @Param('slug') slug: string,
    @User() user: UserEntity,
    @Body(ValidationPipe) data: UpdateBookDTO,
  ) {
    const book = await this.bookService.updateBook(slug, user, data);
    return { book };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteBook(@Param() slug: { slug: string }, @User() user: UserEntity) {
    const book = await this.bookService.deleteBook(slug, user);
    return { book };
  }
}
