import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('travels')
@Unique(['regional', 'regional'])
export class Travel {
  @ObjectIdColumn() id: ObjectID;
  @Column() country: string; //País
  @Column() regional: string; //Local
  @Column() goal: Date; //Meta
  @Column() pictureUrl: string; //Url
  @CreateDateColumn() createdAt: Date; //Data de criação do registro
  @UpdateDateColumn() updatedAt: Date; //Data de atualização do registro

  constructor(travel?: Partial<Travel>) {
    Object.assign(this, travel);
  }
}
