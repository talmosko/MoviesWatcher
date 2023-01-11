import mongoose from "mongoose";
import { membersDocument, membersModel, membersSchema, membersObject } from "../interfaces/mongoose.gen";

const memberSchema : membersSchema = new mongoose.Schema({
    externalId: Number,
    name : String,
    email : String,
    city : String
})

const Member: membersModel = mongoose.model<membersDocument, membersModel>("members", memberSchema);

export default Member;