import { RequestHandler, Request } from "express";
import * as permissionsFile from "../DAL/permissionsFile";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import {
  PermissionsTypes,
  RequestWithUserPermissions,
  UserPermissionsObject,
} from "../types/objectTypes";

// jwt token middleware - get 'jwt' token from cookie and verify it
export const jwtMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.signedCookies.jwt;
    if (!token) {
      return next();
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      async (
        err: VerifyErrors | null,
        decoded: Jwt | JwtPayload | string | undefined
      ) => {
        if (err) {
          return next();
        }
        if (!decoded) {
          return next();
        }
        let userId: string = "";
        if (typeof decoded === "string") {
          const jsonDecoded = JSON.parse(decoded);
          userId = jsonDecoded._id;
        } else if (typeof decoded === "object") {
          userId = (decoded as UserPermissionsObject)._id.toString();
        }
        const userPermissions = await permissionsFile.getPermissionUser(userId);
        if (userPermissions) {
          (req as RequestWithUserPermissions).userPermissions = userPermissions;
        }

        return next();
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//auth middleware - check if user has specific permission

export const isAuth = (
  permission: typeof PermissionsTypes[number]
): RequestHandler => {
  return (req, res, next) => {
    const requestWithUserPermissions = req as RequestWithUserPermissions;
    if (!requestWithUserPermissions.userPermissions) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (
      !requestWithUserPermissions.userPermissions.permissions.includes(
        permission
      )
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
  };
};
