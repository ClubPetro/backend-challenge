import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('travels')
@Unique(['regional', 'regional'])
export class Travel {
  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  regional: string;

  @ApiProperty()
  @Column()
  goal: Date;

  @ApiProperty()
  @Column()
  pictureUrl: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(travel?: Partial<Travel>) {
    Object.assign(this, travel);
  }
}

export class CreateTravelDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  regional: string;

  @ApiProperty()
  goal: Date;
}

export class UpdateTravelDto {
  @ApiProperty()
  regional: string;

  @ApiProperty()
  goal: Date;
}
