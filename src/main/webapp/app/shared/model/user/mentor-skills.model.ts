export interface IMentorSkills {
  id?: number;
  mId?: number;
  sId?: number;
  selfRating?: number;
  yearsOfExp?: number;
  trainingsDelivered?: string;
  facilitiesOffered?: string;
}

export class MentorSkills implements IMentorSkills {
  constructor(
    public id?: number,
    public mId?: number,
    public sId?: number,
    public selfRating?: number,
    public yearsOfExp?: number,
    public trainingsDelivered?: string,
    public facilitiesOffered?: string
  ) {}
}
