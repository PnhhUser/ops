import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755068705119 implements MigrationInterface {
    name = 'Init1755068705119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_772d0ce0473ac2ccfa26060dbe9\``);
        await queryRunner.query(`DROP INDEX \`IDX_8536b8b85c06969f84f0c098b0\` ON \`customers\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`customer_id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`customerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`paymentMethod\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`paymentMethod\` enum ('cash', 'bank_transfer') NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`paymentMethod\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`paymentMethod\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`customer_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`email\` varchar(100) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8536b8b85c06969f84f0c098b0\` ON \`customers\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_772d0ce0473ac2ccfa26060dbe9\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
