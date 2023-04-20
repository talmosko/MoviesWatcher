import { RequestHandler } from "express";
import { UserPermissionsObject } from "../types/objectTypes";
import * as usersFile from "../DAL/usersFile";
import * as permissionsFile from "../DAL/permissionsFile";
import { UserObject, UserPermissions } from "../types/objectTypes";
import { IUserPassword, UserPassword } from "../models/userPasswordModel";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await usersFile.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const permissionsForUser = await permissionsFile.getPermissionUser(userId);

    //get userName from users db
    const userName: IUserPassword | null = await UserPassword.findById(userId, {
      userName: 1,
      _id: 1,
    });

    res.json({
      user: {
        ...user,
        userName: userName?.userName,
        permissions: permissionsForUser?.permissions,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    //get all users from users.json
    const allJsonUsers = await usersFile.getUsers();

    //get all permissions from permissions.json
    const allPermissions = await permissionsFile.getPermissionUsers();

    //get all userNames from users db
    const allUserNames: IUserPassword[] = await UserPassword.find(
      {},
      { userName: 1, _id: 1 }
    );
    //add permissions and UserNames to users
    const allUsers: UserObject[] = allJsonUsers.map((user) => {
      const permissions = allPermissions.find(
        (permission) => permission._id.toString() === user._id.toString()
      );
      const userName = allUserNames.find(
        (userName) => userName._id.toString() === user._id.toString()
      );
      return {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        permissions: permissions?.permissions,
        userName: userName?.userName,
      };
    }) as UserObject[];

    res.status(200).json({
      users: allUsers,
    });
  } catch (err: any) {
    next(err);
  }
};

export const postUser: RequestHandler = async (req, res, next) => {
  try {
    const inputUser: UserObject = req.body as UserObject;
    //save user to userPassword DB to get _id
    const userPassword = new UserPassword({ userName: inputUser.userName });
    await userPassword.save();

    if (userPassword && userPassword._id) {
      //add user to users.json
      const userToJson = {
        _id: userPassword._id,
        firstName: inputUser.firstName,
        lastName: inputUser.lastName,
        createdAt: new Date(),
        sessionTimeout: inputUser.sessionTimeout,
      } as UserObject;
      await usersFile.addUser(userToJson);
      //add user permissions to permissions.json
      const userToPermissions = {
        _id: userPassword._id,
        permissions: inputUser.permissions ? inputUser.permissions : [],
      } as UserPermissionsObject;
      await permissionsFile.addPermissionUser(userToPermissions);
    }
    return res.redirect("/users");
  } catch (err: any) {
    next(err);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    //delete user from db
    await UserPassword.findByIdAndDelete(userId);

    //delete user from users.json
    await usersFile.deleteUser(userId);

    //delete user permissions from permissions.json
    await permissionsFile.deletePermissionUser(userId);
    console.log("User deleted");
    res.status(200).json({ message: "User deleted" });
  } catch (err: any) {
    next(err);
  }
};

export const putUser: RequestHandler = async (req, res, next) => {
  try {
    const inputUser: UserObject = req.body as UserObject;
    //change userNmame in db
    await UserPassword.findByIdAndUpdate(inputUser._id, {
      userName: inputUser.userName,
    });
    //change user in users.json
    const userToJson = {
      _id: inputUser._id,
      firstName: inputUser.firstName,
      lastName: inputUser.lastName,
      sessionTimeout: inputUser.sessionTimeout,
    } as UserObject;
    await usersFile.updateUser(userToJson);

    //change user permissions to permissions.json
    const userToPermissions = {
      _id: inputUser._id,
      permissions: inputUser.permissions ? inputUser.permissions : [],
    } as UserPermissionsObject;
    await permissionsFile.updatePermissionUser(userToPermissions);
    return res.status(201).json({ message: "User updated" });
  } catch (err: any) {
    next(err);
  }
};
