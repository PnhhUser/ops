import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754968389570 implements MigrationInterface {
    name = 'Init1754968389570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`parentRoute\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`route\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`route\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`parentRoute\` varchar(255) NOT NULL`);
    }

}
