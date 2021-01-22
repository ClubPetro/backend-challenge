import { MigrationInterface, QueryRunner } from 'typeorm';

export class worldPlacesEntity1610745422955 implements MigrationInterface {
  name = 'worldPlacesEntity1610745422955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "world_places" ("id" SERIAL NOT NULL, "country" character varying(255) NOT NULL, "location" character varying(255) NOT NULL, "flag_url" character varying(255) NOT NULL, "goal" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5b8a94d6ca8408330b92c3d230c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2bca8cc4ba0e9d19b3a6b9867c" ON "world_places" ("location", "country") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_2bca8cc4ba0e9d19b3a6b9867c"`);
    await queryRunner.query(`DROP TABLE "world_places"`);
  }
}
