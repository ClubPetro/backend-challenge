import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableObjective1685288884925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "objective" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
            "goal_place" VARCHAR NOT NULL,
            "goal_date" TIMESTAMP WITH TIME ZONE NOT NULL,
            "country_id" UUID NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            CONSTRAINT FK_country_id FOREIGN KEY (country_id) REFERENCES "country" (id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "objective";
    `);
  }
}
