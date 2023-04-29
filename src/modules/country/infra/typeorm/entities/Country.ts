import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("country")
class Country {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  flag_url: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default Country;
