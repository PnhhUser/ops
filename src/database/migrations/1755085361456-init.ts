import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1755085361456 implements MigrationInterface {
  name = 'Init1755085361456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`salaries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`baseSalary\` decimal(12,2) NOT NULL, \`bonus\` decimal(12,2) NOT NULL DEFAULT '0.00', \`deduction\` decimal(12,2) NOT NULL DEFAULT '0.00', \`workingDays\` int NOT NULL DEFAULT '0', \`leaveDays\` int NOT NULL DEFAULT '0', \`unpaidLeaveDays\` int NOT NULL DEFAULT '0', \`totalSalary\` decimal(12,2) NULL, \`overtimeDays\` int NOT NULL DEFAULT '0', \`overtimePay\` decimal(12,2) NOT NULL DEFAULT '0.00', \`month\` int NOT NULL, \`year\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employeeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`attendances\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, \`checkInTime\` time NULL, \`checkOutTime\` time NULL, \`status\` enum ('present', 'absent', 'leave') NOT NULL DEFAULT 'present', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employeeId\` int NOT NULL, UNIQUE INDEX \`IDX_1c22de8136d6fe469e9c7512b1\` (\`employeeId\`, \`date\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`salaries\` ADD CONSTRAINT \`FK_46a9b162964c14cb310140da0d7\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`attendances\` ADD CONSTRAINT \`FK_4a9f77d05b9c764ff1053401cdd\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`attendances\` DROP FOREIGN KEY \`FK_4a9f77d05b9c764ff1053401cdd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`salaries\` DROP FOREIGN KEY \`FK_46a9b162964c14cb310140da0d7\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1c22de8136d6fe469e9c7512b1\` ON \`attendances\``,
    );
    await queryRunner.query(`DROP TABLE \`attendances\``);
    await queryRunner.query(`DROP TABLE \`salaries\``);
  }
}
