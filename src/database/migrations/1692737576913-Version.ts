import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1692737576913 implements MigrationInterface {
    name = 'Version1692737576913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`like\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isActive\` tinyint NOT NULL DEFAULT 1, \`tutorialId\` int NOT NULL, \`userId\` bigint NULL, UNIQUE INDEX \`IDX_0e01292b9271a0bb7a97a056e5\` (\`tutorialId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_e8fb739f08d47955a39850fac23\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_e8fb739f08d47955a39850fac23\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e01292b9271a0bb7a97a056e5\` ON \`like\``);
        await queryRunner.query(`DROP TABLE \`like\``);
    }

}
