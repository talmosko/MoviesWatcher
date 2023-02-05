import { UserPermissionsObject } from "../types/subscriptionsTypes";

import jsonfile from "jsonfile";

const file = "./data/permissions.json";

// read from a json file
export const getPermissionUsers = (): Promise<UserPermissionsObject[]> => {
  try {
    return jsonfile.readFile(file) as Promise<UserPermissionsObject[]>;
  } catch (err) {
    return Promise.resolve([]);
  }
};

// write to a json file
export const setPermissionUsers = async (
  userPermissions: UserPermissionsObject[]
) => {
  try {
    await jsonfile.writeFile(file, userPermissions);
    return "Done";
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const addPermissionUser = async (
  userPermissionsObject: UserPermissionsObject
): Promise<void> => {
  try {
    const allPermissionsUsers = await getPermissionUsers();
    allPermissionsUsers.push(userPermissionsObject);
    await setPermissionUsers(allPermissionsUsers);
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const getPermissionUser = async (
  userId: string
): Promise<UserPermissionsObject | undefined> => {
  try {
    const allPermissionsUsers = await getPermissionUsers();
    const user = allPermissionsUsers.find(
      (user) => user._id.toString() === userId
    );
    return user;
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const deletePermissionUser = async (userId: string): Promise<void> => {
  try {
    const allPermissionUsers = await getPermissionUsers();
    const newUsers = allPermissionUsers.filter(
      (user) => user._id.toString() !== userId
    );
    await setPermissionUsers(newUsers);
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};

export const updatePermissionUser = async (
  permissionUser: UserPermissionsObject
): Promise<void> => {
  try {
    const allUsers = await getPermissionUsers();
    const userIndex = allUsers.findIndex(
      (user) => user._id.toString() === permissionUser._id.toString()
    );
    if (userIndex === -1) throw new Error("User not found");
    allUsers[userIndex] = permissionUser;
    await setPermissionUsers(allUsers);
  } catch (err: unknown) {
    throw new Error(err as string);
  }
};
