import { MigrationInterface, QueryRunner } from "typeorm"

export class userInit1667625253170 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "firstName" TO "FIO"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
