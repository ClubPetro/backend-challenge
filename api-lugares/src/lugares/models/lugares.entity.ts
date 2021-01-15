import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lugares{
    @PrimaryGeneratedColumn()
    id: number;

    

}