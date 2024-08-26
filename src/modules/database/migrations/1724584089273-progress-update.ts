import { MigrationInterface, QueryRunner } from "typeorm";

export class ProgressUpdate1724584089273 implements MigrationInterface {
    name = 'ProgressUpdate1724584089273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "progress" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "progress" ADD "user_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "progress" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "progress" ADD "date" TIMESTAMP NOT NULL`);
    }

}
