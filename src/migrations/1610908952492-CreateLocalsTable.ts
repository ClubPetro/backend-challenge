import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLocalsTable1610908952492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'locals',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'countryId',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'locals',
      new TableForeignKey({
        name: 'foreignKeyCountriesLocals',
        columnNames: ['countryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'countries',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('locals', 'foreignKeyCountriesLocals');
    await queryRunner.dropTable('locals');
  }
}
