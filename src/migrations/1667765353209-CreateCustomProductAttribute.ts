import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomProductAttribute1667765353209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "custom_product_attribute" (
        "id" character varying NOT NULL,
        "product_id" character varying NOT NULL,
        "key" character varying NOT NULL,
        "value" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_9zyx115zie0i9ex2945u26anu1z" PRIMARY KEY ("id")
      );
    `)

    await queryRunner.query(
      `CREATE INDEX "IDX_j7hc9h6s7sebipjkhkn2qyc8i00" ON "custom_product_attribute" ("product_id") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "custom_product_attribute"`,
    )

    await queryRunner.query(`DROP INDEX "IDX_j7hc9h6s7sebipjkhkn2qyc8i00"`);
  }
}
