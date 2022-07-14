import { MigrationInterface, QueryRunner } from "typeorm";

export class OneToMany1657790783047 implements MigrationInterface {
    name = 'OneToMany1657790783047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:26:24'`);
        await queryRunner.query(`ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:26:24'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:26:19'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:26:19'`);
    }

}
