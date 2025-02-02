import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schema';
import cloudinary from 'src/uti/cloudinary'; // Ensure this is configured correctly

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<Book>
  ) {}

  async saveFile({image:image, pdf:pdf, title:title, description:description}) {
    if (!image || !pdf) {
      throw new UnauthorizedException('Both image and PDF are required');
    }

    try {
      // ✅ Upload Image to Cloudinary
      const imageUpload = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'book_images' }, // Cloudinary folder
          (error, result) => (error ? reject(error) : resolve(result))
        );
        uploadStream.end(image.buffer);
      });

      // ✅ Upload PDF to Cloudinary (as raw file)
      const pdfUpload = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: 'book_pdfs',
            resource_type: 'raw' // For non-image files like PDFs
          },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        uploadStream.end(pdf.buffer);
      });

      // ✅ Save to MongoDB
      const newBook = new this.BookModel({
        title,
        description,
        image: imageUpload.secure_url, // Cloudinary URL for image
        book: pdfUpload.secure_url // Cloudinary URL for PDF
      });

      await newBook.save();
      return { message: 'Book uploaded successfully', book: newBook };

    } catch (error) {
      console.error('Upload error:', error);
      throw new UnauthorizedException('Error uploading files');
    }
  }
  async getAllBooks(){
    const result=await this.BookModel.find();
    return result;
  }

}
