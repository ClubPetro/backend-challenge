import { Country } from './country.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

@Entity('places')
@Unique(['country', 'name'])
export class Place {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Country, (country) => country)
    country: Country;

    @Column('varchar', { length: 120 })
    name: string;

    @Column('varchar', { length: 7 })
    goal: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
