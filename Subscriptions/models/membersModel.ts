import mongoose from "mongoose";
import {
  MemberDocument,
  MemberSchema,
  MemberModel,
} from "../interfaces/mongoose.gen";

const memberSchema: MemberSchema = new mongoose.Schema({
  externalId: Number,
  name: String,
  email: String,
  city: String,
});

const Member: MemberModel = mongoose.model<MemberDocument, MemberModel>(
  "Member",
  memberSchema
);

export default Member;
