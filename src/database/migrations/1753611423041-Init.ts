import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1753611423041 implements MigrationInterface {
  name = 'Init1753611423041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8681da666ad9699d568b3e9106\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`baseSalary\` decimal(10,2) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`departmentId\` int NULL, UNIQUE INDEX \`IDX_5c70dc5aa01e351730e4ffc929\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`address\` varchar(255) NULL, \`gender\` enum ('male', 'female', 'other') NOT NULL DEFAULT 'other', \`dateOfBirth\` date NULL, \`startDate\` date NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`positionId\` int NULL, \`accountId\` int NULL, UNIQUE INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` (\`email\`), UNIQUE INDEX \`REL_492e9b44dc4b19a848435f9000\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`lastSeen\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_477e3187cedfb5a3ac121e899c\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a87cf0659c3ac379b339acf36a\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permissions_mapping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roleId\` int NULL, \`permissionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_017943867ed5ceef9c03edd974\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`positions\` ADD CONSTRAINT \`FK_bfd9f2db257475ee3a759cfcff6\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_ce0210d6441acd0e094fba8f20a\` FOREIGN KEY (\`positionId\`) REFERENCES \`positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_492e9b44dc4b19a848435f90000\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_fb8505547017736dcb551014c17\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_mapping\` ADD CONSTRAINT \`FK_8790b0e416dd7c1d4f33663ca95\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_mapping\` ADD CONSTRAINT \`FK_456fb2b0009bcdf319946e7bdae\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_mapping\` DROP FOREIGN KEY \`FK_456fb2b0009bcdf319946e7bdae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permissions_mapping\` DROP FOREIGN KEY \`FK_8790b0e416dd7c1d4f33663ca95\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_fb8505547017736dcb551014c17\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_492e9b44dc4b19a848435f90000\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_ce0210d6441acd0e094fba8f20a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`positions\` DROP FOREIGN KEY \`FK_bfd9f2db257475ee3a759cfcff6\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_017943867ed5ceef9c03edd974\` ON \`permissions\``,
    );
    await queryRunner.query(`DROP TABLE \`permissions\``);
    await queryRunner.query(`DROP TABLE \`role_permissions_mapping\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a87cf0659c3ac379b339acf36a\` ON \`roles\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_477e3187cedfb5a3ac121e899c\` ON \`accounts\``,
    );
    await queryRunner.query(`DROP TABLE \`accounts\``);
    await queryRunner.query(
      `DROP INDEX \`REL_492e9b44dc4b19a848435f9000\` ON \`employees\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` ON \`employees\``,
    );
    await queryRunner.query(`DROP TABLE \`employees\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5c70dc5aa01e351730e4ffc929\` ON \`positions\``,
    );
    await queryRunner.query(`DROP TABLE \`positions\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8681da666ad9699d568b3e9106\` ON \`departments\``,
    );
    await queryRunner.query(`DROP TABLE \`departments\``);
  }
}
