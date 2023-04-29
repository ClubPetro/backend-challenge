import Country from "../../../../country/infra/typeorm/entities/Country";
import { v4 as uuidV4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("places")
export class Place {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Country, (country) => country.id)
  @JoinColumn({ name: "country_id" })
  country: Country;

  @Column()
  name: string;

  @Column()
  goal: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default Place;
