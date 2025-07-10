import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableAcounts1752185108366 implements MigrationInterface {
  name = 'UpdateTableAcounts1752185108366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`lastSeen\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_477e3187cedfb5a3ac121e899c\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_477e3187cedfb5a3ac121e899c\` ON \`accounts\``,
    );
    await queryRunner.query(`DROP TABLE \`accounts\``);
  }
}
