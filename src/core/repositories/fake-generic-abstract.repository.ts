import { DeleteResult } from 'typeorm';
import { randomUUID } from 'crypto';

import { GenericInterfaceRepository } from './generic-interface.repository';
import { AbstractRepository } from './abstract.repository';

import { QueryOrderPagination, RepositoryEntity } from '../core.model';

export abstract class FakeGenericAbstractRepository<T extends RepositoryEntity>
  extends AbstractRepository<T>
  implements GenericInterfaceRepository<T>
{
  protected entities: T[] = [];

  public async create(data: T | any): Promise<T> {
    const newEntity = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.entities.push(newEntity);
    return newEntity;
  }

  public async save(data: T | any): Promise<T> {
    const findIndex = this.entities.findIndex(ett => ett.id === data.id);
    if (findIndex >= 0) {
      this.entities[findIndex] = {
        ...this.entities[findIndex],
        ...data,
        updatedAt: new Date(),
      };
      return this.entities[findIndex];
    }
  }

  public async findOneById(id: string): Promise<T> {
    const findIndex = this.entities.findIndex(ett => ett.id === id);
    if (findIndex >= 0) {
      return this.entities[findIndex];
    }
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    let items = [...this.entities];
    Object.keys(filterCondition).find(obj => {
      items = items.filter(item => item[obj] === filterCondition[obj]);
    });
    return items[0];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findWithRelations(relations: any): Promise<T[]> {
    return [];
  }

  public async findAll(
    queryOrderPagination?: QueryOrderPagination<T>[],
  ): Promise<T[]> {
    const order = this.processOrder(queryOrderPagination);

    Object.keys(order).find(obj => {
      this.entities.sort((a, b) => {
        if (order[obj]?.toUpperCase() === 'ASC') {
          return Number(a[obj]) - Number(b[obj]);
        }
        if (order[obj]?.toUpperCase() === 'DESC') {
          return Number(b[obj]) - Number(a[obj]);
        }
        return 0;
      });
    });
    return this.entities;
  }

  public async remove(id: string): Promise<DeleteResult> {
    const findIndex = this.entities.findIndex(ett => ett.id === id);
    if (findIndex >= 0) {
      this.entities.splice(findIndex, 1);
      return {
        raw: findIndex,
        affected: 1,
      };
    }
    return {
      raw: findIndex,
      affected: 0,
    };
  }
}
