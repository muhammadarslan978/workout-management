import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProgressInit1724493866675 implements MigrationInterface {
  name = 'ProgressInit1724493866675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "progress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "workout_id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "progress_data" jsonb NOT NULL, "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79abdfd87a688f9de756a162b6f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "progress" ADD CONSTRAINT "FK_88cbc73617ebd098f09e0b299eb" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "progress" DROP CONSTRAINT "FK_88cbc73617ebd098f09e0b299eb"`,
    );
    await queryRunner.query(`DROP TABLE "progress"`);
  }
}
