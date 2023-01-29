import axios from "axios";
import { MemberObject } from "../types/subscriptionsTypes";
import dotenv from "dotenv";
dotenv.config();

const address =
  (process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/") + "members";

const getMembers = async (): Promise<MemberObject[]> => {
  try {
    const response = await axios.get(address);
    if (response.status !== 200) {
      throw new Error("Members not found");
    }
    const members = (await response.data) as MemberObject[];

    return members;
  } catch (err: any) {
    return [];
  }
};

const getMemberById = async (memberId: string): Promise<MemberObject> => {
  try {
    const response = await axios.get(address + "/" + memberId);
    if (response.status !== 200) {
      throw new Error("Members not found");
    }
    const resData: MemberObject = (await response.data) as MemberObject;

    return resData;
  } catch (err: any) {
    throw new Error(err);
  }
};

const addMember = async (member: MemberObject) => {
  try {
    const response = await axios.post(address, member);
    if (response.status !== 201) {
      throw new Error("Member not added");
    }
    const resData = await response.data;
    return resData;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateMember = async (memberId: string, member: MemberObject) => {
  try {
    const response = await axios.put(address + "/" + memberId, member);
    console.log(response.status);
    if (response.status !== 201) {
      throw new Error("Member not updated");
    }
    const resData = await response.data;
    return resData;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteMember = async (memberId: string) => {
  const response = await axios.delete(address + "/" + memberId);
  if (response.status !== 200) {
    throw new Error("Member not deleted");
  }
  const resData = await response.data;
  return resData;
};

export { getMembers, getMemberById, addMember, updateMember, deleteMember };
