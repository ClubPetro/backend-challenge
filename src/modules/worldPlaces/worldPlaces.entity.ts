import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['location', 'country'], { unique: true })
export class WorldPlaces {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 255, name: 'country' })
  country: string;

  @ApiProperty()
  @Column('varchar', { length: 255, name: 'location' })
  location: string;

  @ApiProperty()
  @Column('varchar', { length: 255, name: 'flag_url' })
  flagUrl: string;

  @ApiProperty()
  @Column('timestamptz', { name: 'goal' })
  goal: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
