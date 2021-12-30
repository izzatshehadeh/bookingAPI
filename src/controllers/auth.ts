import { Express,  NextFunction, Request, Response } from "express";
import AuthService from "../services/auth";
import jwt from "jsonwebtoken";
import { Crypto } from "../helpers/crypto";
import Logger from "../helpers/logger";
import { Console } from "console";

const jwtSecret: string = process.env.JWT_SECRET || "kousablban";
const tokenExpirationInSeconds = process.env.tokenExpirationInSeconds || 360000;



class AuthController {
 // constructor() {/**/}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await AuthService.findUserByEmail(email);
      Logger.debug("user", user);
      if (user) {
        const isPasswordMatch = await Crypto.compare(user.password, password);

        if (!isPasswordMatch) {
          return res.status(200).json({
            success: false, 
            message:"Invalid Username Or Password"
          });
        } else {
          const token = jwt.sign(req.body, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          });

          return res.status(200).json({
            success: true,
            data: user,
            token,
          });
        }
      } else {
        Logger.debug("User Not Found");
        return res.status(200).json({
          success: false,
          message:"Application Error"
        });
      }
    } catch (e) {
      Logger.error(e);
      next(e);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const role = 0;
      const user = await AuthService.findUserByEmail(email);
     
      if (user) {
  
          return res.status(200).json({
            success: false, 
            message:"User Already Exists"
          });
      } else {
        try {
          const newUser = await AuthService.createUser({
            username,
            email,
            password,
            role
          });

          const token = jwt.sign({ username, password }, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          });

          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          });
        } catch (e) {
          Logger.error("Controller capturing error");
          Logger.error( e);
          return res.status(200).json({
            success: false,
            message:"Application Error"
          });
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
