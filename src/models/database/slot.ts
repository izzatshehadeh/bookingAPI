import MongooseService from "../../services/mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "../interfaces/user";
import { ISlot } from "../interfaces/iSlot";
import { UserDocument } from "./user";
import { ServiceProviderDocument } from "./serviceProvider";

export interface SlotDocument extends Document {
  startTime: Date;
  duration : number;
  status: string;
  booker : UserDocument;
  owner : ServiceProviderDocument;
}

interface SlotModel extends Model<SlotDocument> {
  build(attrs: ISlot): SlotDocument;
}

const SlotSchema: Schema = new Schema(
  {
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    owner :{
      type:Schema.Types.ObjectId,
      ref :"ServiceProvider",
      required: false
    },
    booker :{
      type:Schema.Types.ObjectId,
      ref :"User",
      required: false , 
      default:null
    },
    status:{
      type: String, required: false ,   default: ""
    }
  },{
    timestamps: true
}
);


SlotSchema.statics.build = (attrs: IUser) => {
  return new Slot(attrs);
};

const Slot = MongooseService.getInstance().model<SlotDocument, SlotModel>(
  "Slot",
  SlotSchema
);

export default Slot;
