import { DeleteResult } from 'typeorm';

import { QueryOrderPagination } from '../core.model';

export interface GenericInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  save(data: T | any): Promise<T>;

  findOneById(id: string): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(queryOrderPagination?: QueryOrderPagination<any>[]): Promise<T[]>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;
}
