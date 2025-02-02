import { Body, Controller, Delete, Get, Post, Put, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
   @Post('/signup')
   signup(@Body() user: any){
    return this.authService.signup(user);

   }
   @Post('/login')
   login(@Body() user: any){
    return this.authService.login(user);
   }
   @Get('/user')
  @UseGuards(JwtAuthGuard)  // Apply the guard here
  getEmail(@Request() req) {
    const email = req.user.email;  // Access email from the decoded JWT
    return { email };
  }
    @Post('upload')
      @UseGuards(JwtAuthGuard)
      @UseInterceptors(FileInterceptor('file'))
      async uploadFile(@UploadedFile() file, @Request() req) {
          if(!req.user.email){
              throw new UnauthorizedException
          }
          return this.authService.saveFile(file, req.user.email);
      }
    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req){
        return this.authService.getProfile(req.user.email)

    }
    @Get('/all-users')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    allUsers(){
      return this.authService.allUsers();
    }
    @Put('/edit')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    editUser(@Body('email') email, @Body('id') id, @Request() req){
      const premail = req.user.email;
      return this.authService.editUser(email, id);
    }
    @Delete('/delete')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    deleteUser(@Body('id') id){
      return this.authService.deleteUser(id);
    }

    @Get('/isthere')
    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    isthere(){
      return true;
    }
    @Post('/addbook')
    @UseGuards(JwtAuthGuard)
    addBook(@Body('id') id, @Request() req){
      const userId=req.user.sub;
      console.log("my id is",id)
        return this.authService.addBook(id, userId);

    }
    @Get('/latest')
    @UseGuards(JwtAuthGuard)
    latestBook(@Request() req){
      const userId=req.user.sub;
      return this.authService.latestBook(userId);
    }
    
}
