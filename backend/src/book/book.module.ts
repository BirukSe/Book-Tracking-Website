import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "Book", schema: BookSchema}]),AuthModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
