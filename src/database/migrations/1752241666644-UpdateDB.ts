import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDB1752241666644 implements MigrationInterface {
  name = 'UpdateDB1752241666644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`address\` varchar(255) NULL, \`gender\` enum ('male', 'female', 'other') NOT NULL DEFAULT 'other', \`dateOfBirth\` date NULL, \`startDate\` date NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`positionId\` int NULL, \`accountId\` int NULL, UNIQUE INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` (\`email\`), UNIQUE INDEX \`REL_492e9b44dc4b19a848435f9000\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`baseSalary\` decimal(10,2) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5c70dc5aa01e351730e4ffc929\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_ce0210d6441acd0e094fba8f20a\` FOREIGN KEY (\`positionId\`) REFERENCES \`positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_492e9b44dc4b19a848435f90000\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_492e9b44dc4b19a848435f90000\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_ce0210d6441acd0e094fba8f20a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5c70dc5aa01e351730e4ffc929\` ON \`positions\``,
    );
    await queryRunner.query(`DROP TABLE \`positions\``);
    await queryRunner.query(
      `DROP INDEX \`REL_492e9b44dc4b19a848435f9000\` ON \`employees\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` ON \`employees\``,
    );
    await queryRunner.query(`DROP TABLE \`employees\``);
  }
}
