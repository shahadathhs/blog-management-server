import mongoose, { Schema, Model } from "mongoose";

import { IUser } from "./user.interface";

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;