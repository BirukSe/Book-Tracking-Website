import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/schemas/auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name: "Auth", schema: AuthSchema}]),   JwtModule.register({
    secret: 'MY_SECRET_KEY', // Change this to a real secret key
    signOptions: { expiresIn: '30d' },
    })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}
