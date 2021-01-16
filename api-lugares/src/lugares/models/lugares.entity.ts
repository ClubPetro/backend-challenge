import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lugares{
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

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    stringPhoto: string;
}