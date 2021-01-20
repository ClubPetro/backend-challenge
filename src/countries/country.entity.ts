import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import File from '../files/file.entity';
import Local from './locals/local.entity';

@Entity({ name: 'countries' })
class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => File, (file) => file.country, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fileId' })
  file: File;

  @OneToMany(() => Local, (local) => local.country)
  locals: Local[];
}

export default Country;
