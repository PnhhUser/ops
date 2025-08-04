import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754314940703 implements MigrationInterface {
    name = 'Init1754314940703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`departments\` ADD \`key\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`departments\` ADD UNIQUE INDEX \`IDX_c2892a1c87548db0f755815032\` (\`key\`)`);
        await queryRunner.query(`ALTER TABLE \`positions\` ADD \`key\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`positions\` ADD UNIQUE INDEX \`IDX_ab76039b87191fa44ba9f5e5fa\` (\`key\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`positions\` DROP INDEX \`IDX_ab76039b87191fa44ba9f5e5fa\``);
        await queryRunner.query(`ALTER TABLE \`positions\` DROP COLUMN \`key\``);
        await queryRunner.query(`ALTER TABLE \`departments\` DROP INDEX \`IDX_c2892a1c87548db0f755815032\``);
        await queryRunner.query(`ALTER TABLE \`departments\` DROP COLUMN \`key\``);
    }

}
