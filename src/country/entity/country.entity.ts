import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Unique, Entity, Column } from 'typeorm';
import { BaseCollection } from '../../common/entity/base.entity';

@Entity()
@Unique(['name'])
export class Country extends BaseCollection {
  @ApiProperty()
  @Column({ length: 50 })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255 })
  link: string;
}
