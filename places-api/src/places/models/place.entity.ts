import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, IsNull, Unique } from 'typeorm';
import { IsInt, Min, Max, IsUrl, IsOptional } from "class-validator";
const COUNTRY_NAME_NAME = 'country_name';
const COUNTRY_PART_NAME = 'country_part';
//values are not null by default
@Entity()
@Unique([COUNTRY_NAME_NAME, COUNTRY_PART_NAME])
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: COUNTRY_NAME_NAME })
    country_name: string;

    @Column({ name: COUNTRY_PART_NAME })
    country_part: string;

    @Column()
    @IsInt()
    @Min(0)
    year: number;

    @Column()
    @IsInt()
    @Min(1)
    @Max(12)
    month: number;

    @Column()
    @IsUrl()
    image_url: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;
}