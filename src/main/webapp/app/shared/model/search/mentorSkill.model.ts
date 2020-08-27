import { Moment } from 'moment';
export interface IMentorSkill {
  id?: number;
  mentorId?: number;
  name?: string;
  yearsOfExp?: number;
  trainingsDelivered?: number;
  fee?: number;
  mentorCalendarList?: IMentorCalendar[];
}
export interface IMentorCalendar {
  startDatetime?: Moment;
  endDatetime?: Moment;
}

export class MentorSkill implements IMentorSkill {
  constructor(
    public id?: number,
    public mentorId?: number,
    public name?: string,
    public yearsOfExp?: number,
    public trainingsDelivered?: number,
    public fee?: number,
    public mentorCalendarList?: IMentorCalendar[]
  ) {}
}

export class MentorCalendar implements IMentorCalendar {
  constructor(public startDatetime?: Moment, endDatetime?: Moment) {}
}
