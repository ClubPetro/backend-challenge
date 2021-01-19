import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import File from '../files/file.entity';

@Entity({ name: 'countries' })
class Country {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  @Column()
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
}

export default Country;
