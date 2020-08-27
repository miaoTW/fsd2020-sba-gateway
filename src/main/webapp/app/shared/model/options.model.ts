export interface IOption {
  id?: number;
  name?: string;
}
export class Option implements IOption {
  constructor(public id?: number, public name?: string) {}
}
