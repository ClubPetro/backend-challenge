import { CountryEntity } from '../../../modules/country/entities/country.entity';
import { BaseEntity } from '../../../commons/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('objective')
export class ObjectiveEntity extends BaseEntity {
  @Column({ name: 'goal_place' })
  goalPlace: string;

  @Column({ name: 'goal_date' })
  goalDate: string;

  @Column({ name: 'country_id', type: 'uuid' })
  countryId: string;

  @OneToOne(() => CountryEntity, (countryEntity) => countryEntity, {
    eager: false,
  })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: CountryEntity;
}
