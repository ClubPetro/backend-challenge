import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('place')
export class PlaceSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  local: string;

  @Column({ type: Date })
  expectedVisitAt: Date;

  @Column()
  flagUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
