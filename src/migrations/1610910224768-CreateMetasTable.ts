import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMetasTable1610910224768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'metas',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'timestamp',
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
            name: 'localId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'metas',
      new TableForeignKey({
        name: 'foreignKeyMetasLocals',
        columnNames: ['localId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locals',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('metas', 'foreignKeyMetasLocals');
    await queryRunner.dropTable('metas');
  }
}
