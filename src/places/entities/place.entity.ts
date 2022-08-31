import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    country_id: number;

    @Column('varchar', { length: 120 })
    name: string;

    @Column('varchar', { length: 7 })
    goal: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
