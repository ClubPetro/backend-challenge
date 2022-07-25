import { DeleteResult, Repository, FindOneOptions } from 'typeorm';

import { GenericInterfaceRepository } from './generic-interface.repository';
import { AbstractRepository } from './abstract.repository';
import { RepositoryEntity, QueryOrderPagination } from '../core.model';

export abstract class GenericAbstractRepository<T extends RepositoryEntity>
  extends AbstractRepository<T>
  implements GenericInterfaceRepository<T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    super();
    this.entity = entity;
  }
  processOrder(order: QueryOrderPagination<T>[]): any {
    return super.processOrder(order);
  }

  public async create(data: T | any): Promise<T> {
    return await this.entity.save(data);
  }

  public async save(data: T | any): Promise<T> {
    return await this.entity.save(data);
  }

  public async findOneById(id: string): Promise<T> {
    return await this.entity.findOne({ where: { id } } as FindOneOptions<T>);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return await this.entity.findOne({ where: filterCondition });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(
    queryOrderPagination?: QueryOrderPagination<T>[],
  ): Promise<T[]> {
    const order = this.processOrder(queryOrderPagination);
    return await this.entity.find({
      order,
    });
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }
}
