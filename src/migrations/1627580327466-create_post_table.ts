import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUpdateColumnAuthorToUUID1627580327466
  implements MigrationInterface
{
  name = 'createUpdateColumnAuthorToUUID1627580327466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "author"');
    await queryRunner.query('ALTER TABLE "post" ADD "author" uuid');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "author"');
    await queryRunner.query('ALTER TABLE "post" ADD "author" integer');
  }
}
