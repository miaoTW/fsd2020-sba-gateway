export interface ITraining {
  id?: number;
  mentorId?: number;
  name?: string;
  yearsOfExp?: number;
  trainingsDelivered?: number;
  fee?: number;
}
export class Training implements ITraining {
  constructor(
    public id?: number,
    public mentorId?: number,
    public name?: string,
    public yearsOfExp?: number,
    public trainingsDelivered?: number,
    public fee?: number
  ) {}
}
