import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1627579012140 implements MigrationInterface {
  name = 'createPostTable1627579012140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying,
                "content" character varying,
                "publish" boolean,
                "publish_at" TIMESTAMP,
                "author" integer,
                "minutes_read" integer,
                "thumbnail" character varying,
                CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "post"');
  }
}
