import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("Places")
class Place {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  url_flag?: string;

  @Column()
  goal: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Place };
