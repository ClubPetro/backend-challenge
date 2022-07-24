import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('places')
@Unique(['country', 'location'])
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  country: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  location: string;

  @Column()
  goal: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
