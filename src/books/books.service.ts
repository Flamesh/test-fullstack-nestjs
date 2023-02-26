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

  async findAll() {
    return await this.bookRepo.find();
  }

  findBySlug(slug: string) {
    return this.bookRepo.findOne({
      where: { slug },
    });
  }
  private ensureOwnership(user: UserEntity, article: BooksEntity): boolean {
    return article.id === user.id;
  }

  async createBook(user: UserEntity, data: CreateBookDTO) {
    console.log(data);
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

  async deleteBook(slug: string, user: UserEntity) {
    const book = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, book)) {
      throw new UnauthorizedException();
    }
    await this.bookRepo.remove(book);
  }
}
