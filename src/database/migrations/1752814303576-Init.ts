import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1752814303576 implements MigrationInterface {
  name = 'Init1752814303576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8681da666ad9699d568b3e9106\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`positions\` ADD \`departmentId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`positions\` ADD CONSTRAINT \`FK_bfd9f2db257475ee3a759cfcff6\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`positions\` DROP FOREIGN KEY \`FK_bfd9f2db257475ee3a759cfcff6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`positions\` DROP COLUMN \`departmentId\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8681da666ad9699d568b3e9106\` ON \`departments\``,
    );
    await queryRunner.query(`DROP TABLE \`departments\``);
  }
}
