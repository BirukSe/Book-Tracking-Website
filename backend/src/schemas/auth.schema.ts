import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Role } from "src/roles/roles.enum";
@Schema({timestamps: true})
export class Auth{
    @Prop()
    email: string
    @Prop()
    password: string
    @Prop()
    image: string
    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;
    @Prop({ type: [Types.ObjectId], ref: 'Book' })
  readbooks: Types.ObjectId[];
}
export const AuthSchema=SchemaFactory.createForClass(Auth);