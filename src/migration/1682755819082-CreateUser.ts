import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1682755819082 implements MigrationInterface {
  name = 'CreateUser1682755819082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'アカウントID', \`name\` varchar(15) NOT NULL COMMENT 'アカウント名', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
