import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Local from '../countries/locals/local.entity';

@Entity({ name: 'metas' })
class Meta {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Local, (local) => local.meta, {
    eager: true,
  })
  @JoinColumn({ name: 'localId' })
  local: Local;
}

export default Meta;
