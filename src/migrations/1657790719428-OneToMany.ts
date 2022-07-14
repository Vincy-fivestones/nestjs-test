import { MigrationInterface, QueryRunner } from "typeorm";

export class OneToMany1657790719428 implements MigrationInterface {
    name = 'OneToMany1657790719428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:25:20'`);
        await queryRunner.query(`ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:25:20'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:25:03'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:25:03'`);
    }

}
