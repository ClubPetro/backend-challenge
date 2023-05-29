import { CountryEntity } from '../../../modules/country/entities/country.entity';
import { BaseEntity } from '../../../commons/entities/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { validateDate } from '../../../commons/utils/validate-date.utils';

@Entity('objective')
export class ObjectiveEntity extends BaseEntity {
  @Column({ name: 'goal_place' })
  goalPlace: string;

  @Column({ name: 'goal_date' })
  goalDate: Date;

  @Column({ name: 'country_id', type: 'uuid' })
  countryId: string;

  @OneToOne(() => CountryEntity, (countryEntity) => countryEntity, {
    eager: false,
  })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: CountryEntity;

  @BeforeInsert()
  beforeInsert() {
    this.goalPlace = this.goalPlace.toLowerCase();
    this.goalDate = validateDate(this.goalDate);
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.goalPlace = this.goalPlace.toLowerCase();
    this.goalDate = validateDate(this.goalDate);
  }
}
