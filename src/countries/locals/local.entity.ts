import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import Country from '../country.entity';
import Meta from '../../metas/meta.entity';

@Entity({ name: 'locals' })
class Local {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Country, (country) => country.locals, {
    eager: true,
  })
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @OneToOne(() => Meta, (meta) => meta.local)
  meta: Meta;
}

export default Local;
