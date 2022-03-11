import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, Min, Max, } from "class-validator";

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

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;

    @Column()
    image_url: string;
}