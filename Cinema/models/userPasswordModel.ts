import * as mongoose from "mongoose";

interface IUserPassword {
  _id: mongoose.Types.ObjectId;
  userName: string;
  password?: string;
}

const UserPasswordSchema = new mongoose.Schema<IUserPassword>({
  userName: { type: String, required: true, unique: true },
  password: { type: String },
});

const UserPassword = mongoose.model<IUserPassword>(
  "UserPassword",
  UserPasswordSchema
);

type UserPasswordDoc = mongoose.HydratedDocument<IUserPassword>;

export { UserPassword, UserPasswordSchema, UserPasswordDoc, IUserPassword };
