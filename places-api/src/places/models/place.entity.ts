import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, IsNull } from 'typeorm';
import { IsInt, Min, Max, IsUrl, IsOptional } from "class-validator";

//values are not null by default
@Entity()
export class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country_name: string;

    @Column()
    country_part: string;

    @Column()
    @IsInt()
    @Min(1)
    @Max(12)
    month: number;

    @Column()
    @IsInt()
    @Min(0)
    year: number;

    @Column()
    @IsUrl()
    image_url: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;
}