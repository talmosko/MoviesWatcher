import { UserObject } from "../types/subscriptionsTypes";

import jsonfile from "jsonfile";

const file = "./data/users.json";

// read from a json file
export const getUsers = (): Promise<UserObject[]> => {
  try {
    return jsonfile.readFile(file) as Promise<UserObject[]>;
  } catch (err) {
    return Promise.resolve([]);
  }
};

// write to a json file
export const setUsers = async (userObject: UserObject[]) => {
  try {
    await jsonfile.writeFile(file, userObject);
    return "Done";
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const addUser = async (userObject: UserObject): Promise<void> => {
  try {
    const allUsers = await getUsers();
    allUsers.push(userObject);
    await setUsers(allUsers);
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const getUser = async (
  userId: string
): Promise<UserObject | undefined> => {
  try {
    const allUsers = await getUsers();
    const user = allUsers.find((user) => user._id.toString() === userId);
    return user;
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const allUsers = await getUsers();
    const newUsers = allUsers.filter((user) => user._id.toString() !== userId);
    await setUsers(newUsers);
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const updateUser = async (userObject: UserObject): Promise<void> => {
  try {
    const allUsers = await getUsers();
    const userIndex = allUsers.findIndex(
      (user) => user._id.toString() === userObject._id.toString()
    );
    if (userIndex === -1) throw new Error("User not found");
    allUsers[userIndex] = {
      ...userObject,
      createdAt: allUsers[userIndex].createdAt,
    };
    await setUsers(allUsers);
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};
