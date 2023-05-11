import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Place1682616036653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "places",

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "goal",
            type: "varchar",
          },
          {
            name: "country_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_Country",
            //Referenciando a tabela da chave estrangeira
            referencedTableName: "country",
            //Referenciando a coluna
            referencedColumnNames: ["id"],
            //Referenciando a nome da coluna
            columnNames: ["country_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("places");
  }
}
