import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('countries')
export class Country {
  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  name: string;

  constructor(country?: Partial<Country>) {
    Object.assign(this, country);
  }
}
