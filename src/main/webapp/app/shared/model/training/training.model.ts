import { Moment } from 'moment';

export interface ITraining {
  id?: number;
  status?: string;
  progress?: number;
  fees?: number;
  commissionAmount?: number;
  rating?: number;
  startDate?: Moment;
  endDate?: Moment;
  startTime?: Moment;
  endTime?: Moment;
  amountReceived?: number;
  userId?: number;
  mentorId?: number;
  skillId?: number;
  razorpayPaymentId?: string;
}

export interface IUserTraining {
  mentor?: String;
  progress?: number;
  status?: string;
  rating?: number;
  skill?: string;
  start?: string;
  end?: string;
}
export class UserTraining implements IUserTraining {
  constructor(
    public mentor?: string,
    public progress?: number,
    public status?: string,
    public rating?: number,
    public skill?: string,
    public start?: string,
    public end?: string
  ) {}
}

export class Training implements ITraining {
  constructor(
    public id?: number,
    public status?: string,
    public progress?: number,
    public fees?: number,
    public commissionAsmount?: number,
    public rating?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public startTime?: Moment,
    public endTime?: Moment,
    public amountReceived?: number,
    public userId?: number,
    public mentorId?: number,
    public skillId?: number,
    public razorpayPaymentId?: string
  ) {}
}
