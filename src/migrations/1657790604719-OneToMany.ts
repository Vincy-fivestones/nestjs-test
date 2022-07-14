import { MigrationInterface, QueryRunner } from 'typeorm';

export class OneToMany1657790604719 implements MigrationInterface {
  name = 'OneToMany1657790604719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:23:25'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:23:25'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookmark\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:23:21'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT '2022-07-14 09:23:21'`,
    );
  }
}
