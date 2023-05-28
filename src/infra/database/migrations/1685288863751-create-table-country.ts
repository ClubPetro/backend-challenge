import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCountry1685288863751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS "country" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
            "name" varchar UNIQUE NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "country";
        DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
  }
}
