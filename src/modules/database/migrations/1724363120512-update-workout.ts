import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateWorkout1724363120512 implements MigrationInterface {
  name = 'UpdateWorkout1724363120512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD "trainer_id" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "trainer_id"`);
  }
}
