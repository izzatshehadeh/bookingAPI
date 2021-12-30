import MongooseService from "../../services/mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "../interfaces/user";
import { IServiceProvider } from "../interfaces/iServiceProvider";
import { UserDocument } from "./user";
import { SlotDocument } from "./slot";


export interface ServiceProviderDocument extends Document {
  nameEn: string;
  nameAr: string;
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  imageURL: string;
  role : number;
  owner : UserDocument;
  slots : SlotDocument[],
  openingDays : number[]
}

interface ServiceProviderModel extends Model<ServiceProviderDocument> {
  build(attrs: IServiceProvider): ServiceProviderDocument;
}

const ServiceProviderchema: Schema = new Schema(
  {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    code: { type: String, required: true },
    descriptionEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    imageURL: { type: String, required: false },
    owner :{
      type:Schema.Types.ObjectId,
      ref :"User",
      required: false
    },
    slots :[{
      type:Schema.Types.ObjectId,
      ref :"Slot",
      required: false
    }],
    openingDays:{
      type: Array,
      'default': [1, 2, 3]
    }
  },
  {
  }
);


ServiceProviderchema.statics.build = (attrs: IUser) => {
  return new ServiceProvider(attrs);
};

const ServiceProvider = MongooseService.getInstance().model<ServiceProviderDocument, ServiceProviderModel>(
  "ServiceProvider",
  ServiceProviderchema
);

export default ServiceProvider;
