import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1724275573711 implements MigrationInterface {
    name = 'Init1724275573711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."workouts_level_enum" AS ENUM('Beginner', 'Intermediate', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "workouts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "level" "public"."workouts_level_enum" NOT NULL, "type" character varying(100) NOT NULL, "duration" integer NOT NULL, "exercises" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fa741fa4dcf2db35fb483b47961" UNIQUE ("title"), CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workouts"`);
        await queryRunner.query(`DROP TYPE "public"."workouts_level_enum"`);
    }

}
