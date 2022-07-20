import { format } from 'date-fns';

import { InvalidParamError } from '@/shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class Place {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public country: string;

  @ApiProperty()
  public local: string;

  @ApiProperty()
  public expectedVisitAt: string;

  @ApiProperty()
  public flagUrl: string;

  constructor(data: Place.Data) {
    this.validate(data);

    this.id = data.id;
    this.country = data.country;
    this.local = data.local;
    this.flagUrl = data.flagUrl;
    this.expectedVisitAt = format(data.expectedVisitAt, 'MM/yyyy');
  }

  private validate(data: Place.Data) {
    if (!data.id) throw new InvalidParamError('id');
    if (!data.country) throw new InvalidParamError('country');
    if (!data.local) throw new InvalidParamError('local');
    if (!data.expectedVisitAt) throw new InvalidParamError('expectedVisitAt');
    if (!data.flagUrl) throw new InvalidParamError('flagUrl');
  }
}

export namespace Place {
  export interface Data {
    id: number;
    country: string;
    local: string;
    expectedVisitAt: Date;
    flagUrl: string;
  }
}
