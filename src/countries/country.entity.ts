import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('countries')
export class Country {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;

  constructor(country?: Partial<Country>) {
    Object.assign(this, country);
  }
}
