import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
import { classToPlain } from 'class-transformer';
import * as slugify from 'slug';
import { AbstractEntity } from './abstract-entity';
import { UserEntity } from './users.entity';
import { BookModule } from 'src/books/books.module';

@Entity('books')
export class BooksEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ISBN: number;

  @ManyToOne((type) => UserEntity, (user) => user.books, { eager: true })
  user: UserEntity;

  @BeforeInsert()
  generateSlug() {
    console.log('generateSlug');
    console.log(this.title);
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON() {
    return classToPlain(this);
  }
}
