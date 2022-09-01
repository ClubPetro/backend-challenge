import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 120 })
    name: string;

    @Column('char', { length: 2 })
    shortname: string;

    @Column('varchar', { length: 255 })
    flag: string;
}
