import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'travel' })
export class Travel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'goal' })
  goal: string;

  @Column({ name: 'locale' })
  locale: string;

  @Column({ name: 'flag_url' })
  flagUrl: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  constructor(travel: Partial<Travel>) {
    this.id = travel?.id;
    this.country = travel?.country;
    this.goal = travel?.goal;
    this.locale = travel?.locale;
    this.flagUrl = travel?.flagUrl;
    this.createdAt = travel?.createdAt;
    this.updatedAt = travel?.updatedAt;
    this.userId = travel?.userId;
  }
}
