import { IsDate, IsDateString, isDateString, Matches } from 'class-validator';
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Places')
export class Places extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  place: string;

  @Column({
  name: 'date-goal',
  })
  goal: Date;

  @Column({ nullable: true })
  urlflag: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}