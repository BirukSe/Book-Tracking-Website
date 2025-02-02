import { 
    Controller, 
    Post, 
    UseInterceptors, 
    UploadedFiles, 
    Body, 
    UseGuards, 
    Request, 
    UnauthorizedException, 
    Get
  } from '@nestjs/common';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import { BookService } from './book.service';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { RolesGuard } from 'src/auth/roles.guard';
  import { Roles } from 'src/auth/roles.decorator';
  import { Role } from 'src/roles/roles.enum';
 

  
  @Controller('book')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/upload')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'file', maxCount: 1 }, // Image
        { name: 'pdf', maxCount: 1 }   // PDF
      ])
    )
    async uploadFile(
      @UploadedFiles() files: { file?: any, pdf?: any }, 
      @Body('title') title: string, 
      @Body('description') description: string, 
      @Request() req
    ) {
      // Ensure user authentication
      if (!req.user || !req.user.email) {
        throw new UnauthorizedException('User is not authenticated');
      }
  
      // Extract uploaded files
      const image = files.file?.[0];
      const pdf = files.pdf?.[0];
  
      if (!image || !pdf) {
        throw new UnauthorizedException('Both an image and a PDF are required');
      }
  
      // Pass data to service for processing
      return this.bookService.saveFile({
        image, 
        pdf, 
        title, 
        description
      });
    }
    @Get('/show')
    getAllBooks(){
        return this.bookService.getAllBooks();
    }
   
  }
  