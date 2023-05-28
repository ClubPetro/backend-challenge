import { ObjectiveEntity } from 'src/modules/objective/entities/objective.entity';
import { BaseEntity } from '../../../commons/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('country')
export class CountryEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(
    () => ObjectiveEntity,
    (objectiveEntity) => objectiveEntity.country,
    {
      eager: false,
    },
  )
  objectives: ObjectiveEntity[];
}
