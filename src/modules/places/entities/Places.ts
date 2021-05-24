import { v4 as uuidV4 } from "uuid";

class Place {
  id: string;
  name: string;
  country: string;
  urlFlag: string;
  goal: Date;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Place }
