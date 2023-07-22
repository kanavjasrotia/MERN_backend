import UserRole from "../enum/ERole";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  role?: UserRole;
}

export interface IShop extends IUser, Document {
  ownerName: string;
}
