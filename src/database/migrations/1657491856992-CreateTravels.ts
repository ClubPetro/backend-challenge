import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTravels1657491856992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                new Table({
                    name:"travels",
                    columns:[
                        {
                            name:"id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name:"country",
                            type: "varchar"
                        },
                        {
                            name:"meta",
                            type:"varchar"
                        },
                        {
                            name:"createdAt",
                            type:"timestamp",
                            default: "now()",
                        },
                        {
                            name:"updatedAt",
                            type:"timestamp",
                            default:"now()",
                        }
                    ],
                })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("travels")
    }

}
