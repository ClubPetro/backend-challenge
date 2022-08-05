import { Entity, ObjectID, ObjectIdColumn, Column, Unique } from 'typeorm';

@Entity('travels')
@Unique(['regional', 'regional'])
export class Travel {
  @ObjectIdColumn() id: ObjectID;
  @Column() country: string; //País
  @Column() regional: string; //Local
  @Column() goal: Date; //Meta
  @Column() pictureUrl: string; //Url
  @Column() createdAt: Date; //Data de criação do registro
  @Column() updatedAt: Date; //Data de atualização do registro

  constructor(travel?: Partial<Travel>) {
    Object.assign(this, travel);
  }
}
