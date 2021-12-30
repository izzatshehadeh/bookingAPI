import { IServiceProvider } from "./iServiceProvider";

export interface ISlot {
  startTime: Date;
  duration : number;
  owner : string;
  // booker : string;
  // status: string;
}
