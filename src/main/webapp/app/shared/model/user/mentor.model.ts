import { Moment } from 'moment';

export interface IMentor {
  id?: number;
  username?: string;
  linkedinUrl?: string;
  regDatetime?: Moment;
  regCode?: string;
  yearsOfExperience?: number;
  active?: boolean;
}

export class Mentor implements IMentor {
  constructor(
    public id?: number,
    public username?: string,
    public linkedinUrl?: string,
    public regDatetime?: Moment,
    public regCode?: string,
    public yearsOfExperience?: number,
    public active?: boolean
  ) {
    this.active = this.active || false;
  }
}
