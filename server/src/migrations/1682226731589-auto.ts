import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1682226731589 implements MigrationInterface {
    name = 'auto1682226731589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "requisition" ("id" SERIAL NOT NULL,"user_id" integer NOT NULL, "questionnaire_id" integer NOT NULL, "status" character varying NOT NULL, "date_create" TIMESTAMP NOT NULL, "date_update" TIMESTAMP NOT NULL, CONSTRAINT "PK_10018a4d9ca625cfb84e2441f98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."events_direction_enum" RENAME TO "events_direction_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."events_direction_enum" AS ENUM('Научная деятельность', 'Культурно-массовая деятельность', 'Учебная деятельность', 'Спортивная деятельность', 'Общественная деятельность')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum" USING "direction"::"text"::"public"."events_direction_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_direction_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."events_direction_enum_old" AS ENUM('НИД', 'КТД', 'УД', 'СД', 'ОД')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum_old" USING "direction"::"text"::"public"."events_direction_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."events_direction_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."events_direction_enum_old" RENAME TO "events_direction_enum"`);
        await queryRunner.query(`DROP TABLE "requisition"`);
    }

}
