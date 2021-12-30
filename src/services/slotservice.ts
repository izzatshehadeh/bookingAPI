import { ISlot } from "../models/interfaces/iSlot";
import Logger from "../helpers/logger";
import ServiceProvider from "../models/database/serviceProvider";
import Slot, { SlotDocument } from "../models/database/slot";
import { UserDocument } from "../models/database/user";
import { Console } from "console";

class SlotService {

  async find(id : string) {
    return Slot.findById(id).exec();
  }



  async updateBooker (id : string , user : UserDocument)  {

    Logger.debug(id)
    await Slot.findOneAndUpdate({_id : id} , {booker : user , status : "requested" });
    return Slot.findById(id).populate("booker").exec();
     
  }

  async updateBookingStatus (id : string , status : string)  {

    Logger.debug(id)
    await Slot.findOneAndUpdate({_id : id} , { status : status });
    return Slot.findById(id).populate("booker").exec();
     
  }

  async getByBooker(user : UserDocument){
    return Slot.find( { booker: user }).populate('owner')
    .exec();
  }


  async getall() {
    return ServiceProvider.find().populate('owner').limit(50).exec();
  }

  async create(slot : ISlot) {


    const slotDBObject = await Slot.create(slot);
    await slotDBObject.save();
    const parent = await ServiceProvider.findById( slot.owner ).exec();
    parent.slots.push(slotDBObject);
    parent.save((err, advresult) => {
      if(err)
      Logger.error("Update Provider Error " , err);
    })

    return slotDBObject;
  }
}



export default new SlotService();
