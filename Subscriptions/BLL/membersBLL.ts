import getMembers from "../DAL/membersWS";
import { membersObject } from "../interfaces/mongoose.gen";
import Member from "../models/membersModel";

const getAllMembersFromAPI = async () => {
  const members = await getMembers();
  return members.map((member: any) => {
    return {
      externalId: member.id,
      name: member.name,
      email: member.email,
      city: member.address.city,
    } as unknown as membersObject;
  });
};

const initMembersDB = async () => {
  await Member.deleteMany({});
  const members = await getAllMembersFromAPI();
  members.forEach(async (member: membersObject) => {
    const mem = new Member(member);
    await mem.save();
  });
};

const getAllMembers = async () => {
  return await Member.find({});
};

const getMemberById = async (memberId: string) => {
  return await Member.findById(memberId);
};

const addMember = async (member: membersObject) => {
  const mem = new Member(member);
  await mem.save();
};

const updateMember = async (memberId: string, member: membersObject) => {
  return await Member.findByIdAndUpdate(memberId, member);
};

const deleteMember = async (memberId: string) => {
  return await Member.findByIdAndDelete(memberId);
};

export {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  initMembersDB,
};
