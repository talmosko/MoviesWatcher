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

//auth middleware - check if user is logged in and redirect to login page if not, check permissions
export const isAuth: RequestHandler = async (req, res, next) => {
  const requestWithUserPermissions = req as RequestWithUserPermissions;
  if (!requestWithUserPermissions.userPermissions) {
    return res.redirect("/");
  }
  return next();
};

//helper function - check if user has specific permission
export const hasPermission = (
  req: Request,
  permission: typeof PermissionsTypes[number]
) => {
  const requestWithUserPermissions = req as RequestWithUserPermissions;
  if (!requestWithUserPermissions.userPermissions) {
    return false;
  }
  return requestWithUserPermissions.userPermissions.permissions.includes(
    permission
  );
};
