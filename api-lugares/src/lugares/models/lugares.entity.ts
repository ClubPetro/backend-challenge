import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Lugares extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomePais: string;

    @Column()
    local: string;

    @Column()
    mes: number;

    @Column()
    ano: number;

    @Column({ type: 'timestamp with time zone' })
    created_at: Date;

    @Column({ type: 'timestamp with time zone' })
    updated_at: Date;

    @Column()
    stringPhoto: string;
}