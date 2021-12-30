import { Request, Response, NextFunction } from "express";
import ServiceProviderService from "../services/serviceProvider"
import UserService from "../services/user"
//import { body, validationResult } from 'express-validator';
import slotservice from "../services/slotservice";
import Logger from "../helpers/logger";

class ServiceProviderController {
  // constructor() {/**/}

  async getAll(req: any, res: Response, next: NextFunction) {
   try {

    const r = await ServiceProviderService.getall();

      return res.status(200).json({
        success: true,
        data: r,
      });
    } catch (e) {
      next(e);
    }
  }

  

  async getOnePopulatedAdmin(req: any, res: Response, next: NextFunction) {
    try {
      const text = req.body.text;
     
     const r = await ServiceProviderService.findPopulated(text);
      return res.status(200).json({
         success: true,
         data: r,
       });
     } catch (e) {
       next(e);
     }
   }
  
  async getallPopulatedAdmin(req: any, res: Response, next: NextFunction) {
    try {
 
     const r = await ServiceProviderService.getallPopulatedAdmin();
 
       return res.status(200).json({
         success: true,
         data: r,
       });
     } catch (e) {
       next(e);
     }
   }
  
  async getallPopulated(req: any, res: Response, next: NextFunction) {
    try {
 
     const r = await ServiceProviderService.getallPopulated();
 
       return res.status(200).json({
         success: true,
         data: r,
       });
     } catch (e) {
       next(e);
     }
   }

  async getOne(req: any, res: Response, next: NextFunction) {
    try {
      const text = req.body.text;
     
     const r = await ServiceProviderService.find(text);
      return res.status(200).json({
         success: true,
         data: r,
       });
     } catch (e) {
       next(e);
     }
   }

   async getOneAdmin(req: any, res: Response, next: NextFunction) {
    try {
      const text = req.body.text;
     
     const r = await (await ServiceProviderService.find(text));
      return res.status(200).json({
         success: true,
         data: r,
       });
     } catch (e) {
       next(e);
     }
   }

  async search(req: any, res: Response, next: NextFunction) {
    try {
      const text = req.body.text;
       const r = await ServiceProviderService.search(text);
       return res.status(200).json({
         success: true,
         data: r,
       });
     } catch (e) {
       next(e);
     }
   }

   async create(req: any, res: Response, next: NextFunction) {
    try {
    const email = req.user.email;
    const user = await UserService.findUserByEmail(email);

    const r = await ServiceProviderService.create("test" , user);
    return res.status(200).json({
      success: true,
      data: r,
    });

  } catch (e) {
    next(e);
  }
   }

   async createTimeslots(req: any, res: Response, next: NextFunction) {

    try {
      const owner = req.body.provider;
      const startTime = req.body.startTime;
      const duration = req.body.duration;
  
        const r = await slotservice.create({
          startTime ,
          duration ,
          owner 
        });
        return res.status(200).json({
          success: true,
          data: r,
        });

      } catch (e) {
        next(e);
      }
   }

   async bookTimeslot(req: any, res: Response, next: NextFunction) {

    try {
      const id = req.body.id;
      const email = req.user.email;

      Logger.debug(req.user)

      const user = await UserService.findUserByEmail(email);

  
        const r = await slotservice.updateBooker( id , user );
        
        return res.status(200).json({
          success: true,
          data: r,
        });

      } catch (e) {
        next(e);
      }
   }

   async updateBookingStatus(req: any, res: Response, next: NextFunction) {

    try {
      const id = req.body.id;
      const status = req.body.status;
      const email = req.user.email;

      const user = await UserService.findUserByEmail(email);

  
        const r = await slotservice.updateBookingStatus( id , status );
        
        return res.status(200).json({
          success: true,
          data: r,
        });

      } catch (e) {
        next(e);
      }
   }

   async getByBooker(req: any, res: Response, next: NextFunction) {

    try {
      const email = req.user.email;

      Logger.debug(req.user)

      const user = await UserService.findUserByEmail(email);
        const r = await slotservice.getByBooker( user );
        
        return res.status(200).json({
          success: true,
          data: r,
        });

      } catch (e) {
        next(e);
      }
   }


   
}

export default new ServiceProviderController();
