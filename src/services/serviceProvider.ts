import ServiceProvider, { ServiceProviderDocument } from "../models/database/serviceProvider";
import { UserDocument } from "../models/database/user";
class ServiceProviderService {

  async find(id : string) : Promise<ServiceProviderDocument> {

   
    return ServiceProvider.findById(id).populate(
      {
         path: 'slots', 
         match: { startTime: {$gt:  Date.now()} , status: '' },
      }).exec();
  }
  async findPopulated(id : string) : Promise<ServiceProviderDocument> {
    return ServiceProvider.findById(id).populate({path : 'slots',
   
    populate : {
      path : 'booker'
    }}).exec();
  }
  async getall() {
    return ServiceProvider.find()
    //.populate('slots')
    .limit(50).exec();
  }
  async getallPopulated() {
    return ServiceProvider.find()
    .populate('slots')
    .limit(50).exec();
  }

 // findPopulated
  
  async getallPopulatedAdmin() {
    return ServiceProvider.find().populate({path : 'slots',
    match: { startTime: {$gt:  Date.now()}  },
    populate : {
      path : 'booker'
    }}).exec();
  }

  async getallPopulatedWithBookers() {
    return ServiceProvider.find()
    .populate({path : 'slots',
    populate : {
      path : 'booker'
    }}).limit(50).exec();
  }
  async search(name: string) {

    const regex = new RegExp(name, 'i');


    return ServiceProvider.find({ $or: [{ nameEn: { $regex: regex } }, { nameAr: { $regex: regex } }] })
    .populate({path : 'slots',
    populate : {
      path : 'booker'
    }})
    .exec();
  }
  async create(name: string , user : UserDocument) {

    const serviceProvider = await ServiceProvider.create({
      nameEn: name,
      nameAr: name,
      code: name,
      descriptionEn: name,
      descriptionAr: name,
      imageURL: name,
      owner : user
    });
    await serviceProvider.save();

    return serviceProvider;
  }
}



export default new ServiceProviderService();
