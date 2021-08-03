import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionColumnToPostTable1628009012341
  implements MigrationInterface
{
  name = 'addDescriptionColumnToPostTable1628009012341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ADD "description" character varying',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "description"');
  }
}
