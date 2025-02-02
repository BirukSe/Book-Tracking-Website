import { Injectable, Request, ServiceUnavailableException, UnauthorizedException, UseGuards } from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';
import { Auth } from 'src/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import cloudinary from 'src/uti/cloudinary';



@Injectable()
export class AuthService {
    constructor(
     @InjectModel(Auth.name)
     private AuthModel: mongoose.Model<Auth>,
     private jwtService: JwtService
    ) {}

    signup(user: Auth) {
        console.log("my user is", user);
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
        user.password = hashedPassword;
        return this.AuthModel.create(user);
    }

    async login(user: any) {
        console.log(user);
        const existingUser = await this.AuthModel.findOne({email: user.email}).exec();
        if (!existingUser) {
            throw new Error('User not found');
        }
    
        const isPasswordMatching = bcrypt.compareSync(user.password, existingUser.password);
        if (!isPasswordMatching) {
            throw new Error('Invalid credentials');
        }
    
        // Create a payload including the role and other details
        const payload = { email: existingUser.email, sub: existingUser._id, role: existingUser.role };
    
        // Generate a JWT token
        const token = this.jwtService.sign(payload);
    
        // Return user details and token in the response
        return {
            user: existingUser,
            token,
            role: existingUser.role  // Send the role to the frontend
        };
    }
    
     async saveFile(file, email) {
            console.log("my file is", file);
    
          
    
            const cloudinaryResponse = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { resource_type: 'auto' },
                  (error, result) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  }
                );
                uploadStream.end(file.buffer);
              });
        
              const secureUrl = cloudinaryResponse.secure_url;
             
              const result=await this.AuthModel.findOne({email});
              if(!result){
                throw new UnauthorizedException
              }
              result.image=secureUrl;
              await result.save();
              return {image: secureUrl};
          
        }
        async getProfile(email){
            const result=await this.AuthModel.findOne({email})
            if(!result){
                throw new ServiceUnavailableException
            }
            return {image: result.image};
        }
        async allUsers(){
         
        const result = await this.AuthModel.find({ role: { $ne: 'admin' } });
        return result;
        }
        async editUser(email: string, id: any){
          const result = await this.AuthModel.findByIdAndUpdate(id, { email: email }, { new: true });
          return result;
          
        }
        async deleteUser(id){
          const result=await this.AuthModel.findByIdAndDelete(id);
          return result;
        }
        async addBook(id: any, userId: any): Promise<Auth> {
          const user = await this.AuthModel.findById(userId).exec();
          if (!user) {
            throw new Error('User not found');
          }
      
          
          if (!user.readbooks.includes(id)) {
          
            user.readbooks.push(id);
            await user.save();
          }
      
          return user;
        }
        async latestBook(userId:any){
          const user = await this.AuthModel.findById(userId)
          .populate('readbooks')  
          .exec();
  

      if (!user) {
          throw new ServiceUnavailableException('User not found');
      }
  

      const latestBook = user.readbooks[user.readbooks.length - 1]; 
  
     
      return {
          user,
          latestBook,
      };

        }
  
}

