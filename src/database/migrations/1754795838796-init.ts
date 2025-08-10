import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1754795838796 implements MigrationInterface {
  name = 'Init1754795838796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`type\` enum ('system', 'custom') NOT NULL DEFAULT 'custom'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`type\``);
  }
}
