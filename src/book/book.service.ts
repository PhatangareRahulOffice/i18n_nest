import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(dto: BookDTO): Promise<Book | null> {
    try {
      const newBook = this.bookRepository.create(dto);
      await this.bookRepository.save(newBook);
      return newBook;
    } catch (error) {
      throw new Error('Error Creating Book');
    }
  }
  async getBooks(): Promise<Book[]> {
    try {
      const book = await this.bookRepository.find();
      return book;
    } catch (error) {
      throw new Error('Error Reciving books');
    }
  }
  async getBookById(id: any): Promise<Book | null> {
    console.log(id, typeof id);
    try {
      const book = await this.bookRepository.findOne({ where: { id } });
      return book;
    } catch (error) {
      throw new Error('Error retrieving book by ID');
    }
  }
  async updateBook(id: any, dto: BookDTO): Promise<Book | null> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });
      if (!book) {
        return null;
      }
      book.name = dto.name;
      book.description = dto.description;
      book.author = dto.author;
      book.price = dto.price;
      book.year = dto.year;

      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      throw new Error('Error updating book');
    }
  }
  async deleteBook(id: string): Promise<any> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });
      if (!book) {
        return { message: 'Book not found ' };
      }
      await this.bookRepository.remove(book);
      return { message: 'Book deleted' };
    } catch (error) {
      throw new Error('Error deleting book');
    }
  }
}
