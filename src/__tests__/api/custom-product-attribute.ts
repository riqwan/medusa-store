import { CustomProductAttribute } from "../../models/custom-product-attribute"
import { testDatabase } from '../../test-helpers/test-database'
import { setupTestServer } from '../../test-helpers/setup-test-server'
import Router from '../../api'

jest.setTimeout(20000)

describe('API: CustomProductAttribute', () => {
  beforeEach(async () => {
    await testDatabase.setup()
    await setupTestServer.setup()
  })

  afterEach(async () => {
    await testDatabase.destroy()
    await setupTestServer.destroy()
  })

  describe('GET /admin/:productId/custom-product-attributes', () => {
    let productId: string

    beforeEach(async () => {
      // create a product
      // TODO: find a cleaner way to get this done, maybe factories?
      const repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)
      productId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"

      const customProductAttributeEntity = await repository.create({
        key: "test",
        value: "value",
        product_id: productId
      })

      const customProductAttributeRecord = await repository.save(customProductAttributeEntity)
    })

    it("returns an array of custom product attributes for a product", async () => {
      const app = setupTestServer.getApp()
      const api = setupTestServer.getApi()

      const res = await api.get(`/admin/${productId}/custom-product-attributes`)

      console.log("res - ", res)
    })
  })
})