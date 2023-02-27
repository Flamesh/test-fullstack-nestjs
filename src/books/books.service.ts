import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { UserEntity } from 'src/entities/users.entity';
import { CreateBookDTO, UpdateBookDTO } from 'src/models/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private bookRepo: Repository<BooksEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findAll(user: UserEntity) {
    return await this.bookRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
      order: { created: 'ASC' },
    });
  }

  findBySlug(slug: string) {
    return this.bookRepo.findOne({
      where: { slug },
    });
  }
  private ensureOwnership(user: UserEntity, book: BooksEntity): boolean {
    return book.user.id === user.id;
  }

  async createBook(user: UserEntity, data: CreateBookDTO) {
    const book = this.bookRepo.create(data);
    book.user = user;
    const { slug } = await book.save();

    return (await this.findBySlug(slug)).toJSON();
  }

  async updateBook(slug: string, user: UserEntity, data: UpdateBookDTO) {
    const book = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, book)) {
      throw new UnauthorizedException();
    }
    await this.bookRepo.update({ slug }, data);
    return book.toJSON();
  }

  async deleteBook(slug: { slug: string }, user: UserEntity) {
    const book = await this.findBySlug(slug.slug);

    if (!this.ensureOwnership(user, book)) {
      throw new UnauthorizedException();
    }
    await this.bookRepo.remove(book);
    return true;
  }
}
