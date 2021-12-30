import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_KEY = process.env.JWT_SECRET || "kousablban";
import Logger from "../helpers/logger";


declare module "express" {
  export interface Request {
    user: any
  }
}

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
     
      const token = authHeader.split(' ')[1];
      jwt.verify(token, JWT_KEY, (err: any, user: any) => {
        if (err) {
          Logger.error("Error", err);
          Logger.error(err);
          return res
            .status(403)
            .send({ success: false, message: "Token Expired" });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(403).json({ success: false, message: "UnAuthorized" });
    }
  }
  
  authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
     
      const token = authHeader.split(' ')[1];
      jwt.verify(token, JWT_KEY, (err: any, user: any) => {
        if (err) {
          Logger.error("Error", err);
          Logger.error(err);
          return res
            .status(403)
            .send({ success: false, message: "Token Expired" });
        }
        if( user.role === 1)
        return res
        .status(403)
        .send({ success: false, message: "Unauthorized" });

        req.user = user;
        
        next();
      });
    } else {
      res.status(403).json({ success: false, message: "UnAuthorized" });
    }
  }
}

export default new JWT();
