import { ObjectiveEntity } from '../../../modules/objective/entities/objective.entity';
import { BaseEntity } from '../../../commons/entities/base.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

@Entity('country')
export class CountryEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ name: 'flag_url' })
  flagUrl: string;

  @OneToMany(
    () => ObjectiveEntity,
    (objectiveEntity) => objectiveEntity.country,
    {
      eager: false,
    },
  )
  objectives: ObjectiveEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.name = this.name.toLowerCase();
  }
}
