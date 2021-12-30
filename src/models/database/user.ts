import MongooseService from "../../services/mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { IUser } from "../interfaces/user";
import {Crypto } from "../../helpers/crypto";

const scryptAsync = promisify(scrypt); 

export interface UserDocument extends Document {
  email: string;
  password: string;
  username: string;
  role : number;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: IUser): UserDocument;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: Number, required: true , default:0 },
  },
  {
    toObject: {
     // transform (doc, ret) {},
    },
    toJSON: {
      transform (doc, ret) {
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Crypto.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = MongooseService.getInstance().model<UserDocument, UserModel>(
  "User",
  UserSchema
);

export default User;
