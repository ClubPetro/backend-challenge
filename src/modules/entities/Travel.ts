import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4} from 'uuid';

@Entity("travels")
class Travel {
    @PrimaryColumn()
    id?: string;

    @Column()
    country: string;
    @Column()
    place: string;
    @Column()
    goal: Date;
    @Column()
    urlFlag: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    constructor(){
        if(!this.id){
            this.id  = uuidV4();
        }
    }
}

export {Travel}