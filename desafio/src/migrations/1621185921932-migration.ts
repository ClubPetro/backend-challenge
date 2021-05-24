import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621185921932 implements MigrationInterface {
    name = 'migration1621185921932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "meta" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "meta" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "meta" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "meta" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "meta" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "place" ADD "meta" TIMESTAMP NOT NULL`);
    }

}
