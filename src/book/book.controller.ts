import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  async addBook(@Body() Dto: BookDTO) {
    return this.bookService.createBook(Dto);
  }

  @Get('getall')
  async getAllBooks() {
    return this.bookService.getBooks();
  }
  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() dto: BookDTO) {
    return this.bookService.updateBook(id, dto);
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
