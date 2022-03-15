import {MigrationInterface, QueryRunner} from "typeorm";

export class testMigration1647306252483 implements MigrationInterface {
    name = 'testMigration1647306252483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "country_name" character varying NOT NULL, "country_part" character varying NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "image_url" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_949bae5b8ea567db4501e7a7340" UNIQUE ("country_name", "country_part"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "place"`);
    }

}
