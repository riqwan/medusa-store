import { CustomProductAttribute } from "../../models/custom-product-attribute"
import { testDatabase } from '../../test-helpers/test-database'

describe('Model: CustomProductAttribute', () => {
  beforeEach(async () => { await testDatabase.setup() })
  afterEach(async () => { await testDatabase.destroy() })

  describe('when an entity is created successfully', () => {
    it("should create a custom product attribute with all attributes of entity", async () => {
      const repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)
      const expectedProductId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"

      const customProductAttributeEntity = await repository.create({
        key: "test",
        value: "value",
        product_id: expectedProductId
      })

      const customProductAttributeRecord = await repository.save(customProductAttributeEntity)

      expect(customProductAttributeRecord).toEqual({
        id: expect.stringContaining("prod_attr_"),
        key: "test",
        value: "value",
        product_id: expect.stringContaining("prod_"),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    })
  })

  describe('when database constraints are not met', () => {
    it("should throw not null constraint error when key is undefined", async () => {
      const repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)
      const expectedProductId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"

      const customProductAttributeEntity = await repository.create({
        value: "value",
        product_id: expectedProductId
      })

      await expect(
        repository.save(customProductAttributeEntity)
      ).rejects
      .toThrow('null value in column "key" violates not-null constraint')
    })

    it("should throw not null constraint error when value is undefined", async () => {
      const repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)
      const expectedProductId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"

      const customProductAttributeEntity = await repository.create({
        key: "test",
        product_id: expectedProductId
      })

      await expect(
        repository.save(customProductAttributeEntity)
      ).rejects
      .toThrow('null value in column "value" violates not-null constraint')
    })
  })
})