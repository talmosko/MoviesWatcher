import getMembers from "../DAL/membersWS";
import { MemberObject, SubscriptionObject } from "../interfaces/mongoose.gen";
import Member from "../models/membersModel";
import Subscription from "../models/subscriptionsModel";

const getAllMembersFromAPI = async (): Promise<MemberObject[]> => {
  try {
    const members = await getMembers();
    return members.map((member: any) => {
      return {
        externalId: member.id,
        name: member.name,
        email: member.email,
        city: member.address.city,
      } as unknown as MemberObject;
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const initMembersDB = async (): Promise<void> => {
  try {
    await Member.deleteMany({});
    const members = await getAllMembersFromAPI();
    members.forEach(async (member: MemberObject) => {
      const mem = new Member(member);
      await mem.save();
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllMembers = async (): Promise<MemberObject[]> => {
  try {
    return await Member.find({});
  } catch (err: any) {
    throw new Error(err);
  }
};

const getMemberById = async (
  memberId: string
): Promise<MemberObject | null> => {
  try {
    return await Member.findById(memberId);
  } catch (err: any) {
    throw new Error(err);
  }
};

const addMember = async (member: MemberObject): Promise<void> => {
  try {
    const mem = new Member(member);
    await mem.save();
  } catch (err: any) {
    throw new Error(err);
  }
};

const updateMember = async (
  memberId: string,
  member: MemberObject
): Promise<MemberObject | null> => {
  try {
    return await Member.findByIdAndUpdate(memberId, member);
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteMember = async (
  memberId: string
): Promise<{
  memberId: MemberObject["_id"];
  subscriptions: SubscriptionObject["_id"][];
}> => {
  try {
    //Delete member
    const deletedMember: MemberObject | null = await Member.findByIdAndDelete(
      memberId
    ).catch((err) => {
      throw new Error("error deleting member" + err);
    });
    if (!deletedMember)
      throw new Error("Member not found, therefore not deleted");

    // Get the Subscriptions that have the specified memberId
    const subsToDelete: SubscriptionObject[] = await Subscription.find({
      memberId: memberId,
    }).catch((err) => {
      throw new Error("error finding subscriptions to delete" + err);
    });

    // Delete the Subscriptions and retrieve them at the same time
    const deletedSubs = await Subscription.deleteMany({
      memberId: memberId,
    }).catch((err) => {
      throw new Error("error deleting subscriptions" + err);
    });

    // Extract the deleted documents from the result
    const deletedSubsIds =
      deletedSubs.deletedCount > 0 ? subsToDelete.map((sub) => sub._id) : [];

    return { memberId: deletedMember._id, subscriptions: deletedSubsIds };
  } catch (err: any) {
    throw new Error(err);
  }
};

export {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  initMembersDB,
};
