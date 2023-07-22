import mongoose, { Schema, Document } from "mongoose";

import { IUser, IShop } from "../core/interface/IUser";
import EUserRole from "../core/enum/ERole";

const shopSchema: Schema<IUser | IShop> = new Schema<IUser | IShop>({
  name: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: [EUserRole.User, EUserRole.Shop],
    required: true,
  },
});

const User = mongoose.model<IUser | IShop>("User", shopSchema);

export default User;
