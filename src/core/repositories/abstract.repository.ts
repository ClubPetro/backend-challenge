import { QueryOrderPagination, RepositoryEntity } from '../core.model';

export abstract class AbstractRepository<T extends RepositoryEntity> {
  processOrder(order: QueryOrderPagination<T>[]): any {
    return order.reduce(
      (acc, curr) => ({ ...acc, [curr.field]: curr.order }),
      {},
    );
  }
}
