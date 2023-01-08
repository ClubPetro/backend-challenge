import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class BaseCollection extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty({ type: Date })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: string;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
  })
  updateAt: string;

  @Column({
    type: 'bool',
    name: 'active',
    default: true,
  })
  active: boolean;
}
