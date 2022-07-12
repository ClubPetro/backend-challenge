import { v4 as uuidV4} from 'uuid';

class Travel {
    id?: string;

    country: string;

    place: string;

    goal: Date;

    urlFlag: string;

    createdAt: Date;

    updatedAt: Date;

    constructor(){
        if(!this.id){
            this.id  = uuidV4();
        }
    }
}

export {Travel}