import * as bcrypt from 'bcryptjs';

export class Utils {
  public static validateHash(value: string, hashedValue: string) {
    return bcrypt.compareSync(value, hashedValue);
  }

  public static hashGenerate(value: string) {
    return bcrypt.hashSync(value, 8);
  }

  public static generateId(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  public static convertSnakeToCamel(data: any) {
    const isArray = function (item) {
      return Array.isArray(item);
    };

    const isObject = function (item) {
      return (
        item === Object(item) && !isArray(item) && typeof item !== 'function'
      );
    };

    const toCamel = (item) => {
      return item.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
      });
    };

    const keysToCamel = function (item) {
      if (isObject(item)) {
        const n = {};

        Object.keys(item).forEach((k) => {
          n[toCamel(k)] =
            item[k] instanceof Date ? item[k] : keysToCamel(item[k]);
        });

        return n;
      } else if (isArray(item)) {
        return item.map((i) => {
          return keysToCamel(i);
        });
      }

      return item;
    };

    return keysToCamel(data);
  }
}
