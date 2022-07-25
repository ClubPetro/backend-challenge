import { ApiProperty } from '@nestjs/swagger';
export type QueryOrderType = 'ASC' | 'DESC';

export class Where {
  field: string;
  value: any;
}

export class RepositoryEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  [property: string]: any;
}

export class QueryOrderPagination<E extends RepositoryEntity> {
  field: keyof E;
  order: QueryOrderType;
}

export class QueryPagination<E extends RepositoryEntity> {
  @ApiProperty({ type: [QueryOrderPagination] })
  order: QueryOrderPagination<E>[];
}
