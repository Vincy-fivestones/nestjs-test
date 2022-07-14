import { MigrationInterface, QueryRunner } from "typeorm";

export class OneToMany1657790661579 implements MigrationInterface {
    name = 'OneToMany1657790661579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:24:22'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:24:22'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:24:16'`);
        await queryRunner.query(`ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:24:16'`);
    }

}
