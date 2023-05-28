import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    this.id = uuid();
  }
}
