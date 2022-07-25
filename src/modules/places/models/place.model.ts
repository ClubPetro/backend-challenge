import { Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class Place {
  @ApiProperty()
  id: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  goal: Date;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor({ id, country, location, goal, imageUrl, createdAt, updatedAt }) {
    this.id = id;
    this.country = country;
    this.location = location;
    this.goal = goal;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @Expose()
  @ApiProperty()
  get meta(): string {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        // day: '2-digit',
      }).format(new Date(this.goal));
    } catch (error) {
      return this.goal.toString();
    }
  }
}
