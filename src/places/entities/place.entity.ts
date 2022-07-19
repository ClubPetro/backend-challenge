import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique('country_place_constraint', ['country', 'name'])
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  targetDate: Date;

  @Column()
  countryFlagUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
