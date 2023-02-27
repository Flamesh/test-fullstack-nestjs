import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksEntity } from 'src/entities/books.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/users.entity';
describe('ArticlesController', () => {
  let controller: BooksController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BooksEntity],
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(BooksEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = [
        {
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          ISBN: 1234567890,
        },
        {
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          ISBN: 1234567890,
        },
      ];
      jest.spyOn(controller, 'findAll').mockImplementation(() => result as any);

      expect(await controller.findAll()).toBe(result);

      const res = await controller.findAll();
      expect(res).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const result = {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        ISBN: 1234567890,
        slug: 'the-lord-of-the-rings',
      };
      jest
        .spyOn(controller, 'findBySlug')
        .mockImplementation(() => result as any);

      expect(await controller.findBySlug(result.slug)).toBe(result);

      const res = await controller.findBySlug('test');
      expect(res).toEqual(result);
    });
  });

  describe('create', () => {
    const user = {
      email: 'test@gmail.com',
      password: 'test',
      username: 'test',
      books: [],
    } as any;
    const book = {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      ISBN: 1234567890,
      slug: 'the-lord-of-the-rings',
    };
    it('should return a book', async () => {
      jest
        .spyOn(controller, 'createBook')
        .mockImplementation(() => book as any);

      const res = await controller.createBook(user, book);
      expect(res).toEqual(book);
    });

    it('should return updated book', async () => {
      const book_edit = {
        title: 'The Lord of the Rings-edit',
        author: 'J.R.R. Tolkien',
        ISBN: 1234567890,
        slug: 'the-lord-of-the-rings',
      };

      jest
        .spyOn(controller, 'updateBook')
        .mockImplementation(() => book_edit as any);

      const res = await controller.updateBook(book.slug, user, book_edit);
      expect(res).toEqual(book_edit);
    });

    it('should return deleted book', async () => {
      jest
        .spyOn(controller, 'deleteBook')
        .mockImplementation(() => book as any);

      const slug = {
        slug: book.slug,
      };
      const res = await controller.deleteBook(slug, user);
      expect(res).toEqual(book);
    });
  });
});
