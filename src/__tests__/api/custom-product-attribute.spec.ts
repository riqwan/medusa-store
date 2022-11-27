import { CustomProductAttribute } from "../../models/custom-product-attribute"
import { testDatabase } from '../../test-helpers/test-database'
import { setupTestServer } from '../../test-helpers/setup-test-server'
import Router from '../../api'
import CustomProductAttributeService from "../../services/custom-product-attribute"
import { CustomProductAttributeServiceOptions } from "../../types/services/custom-product-attribute"
import { AwilixContainer } from "awilix"
import { Express } from "express"
import { ContainerRegister } from '../../types/tests'

jest.setTimeout(20000)

describe('API: CustomProductAttribute', () => {
  let testServer

  async function containerRegisters(): Promise<ContainerRegister[]> {
    const customProductAttributeRepository = await testDatabase.getConnection()
      .getRepository(CustomProductAttribute)

    const customProductAttributeService = new CustomProductAttributeService({
      customProductAttributeRepository,
    })

    return [{
      name: 'customProductAttributeService',
      instance: customProductAttributeService,
    }]
  }

  beforeEach(async () => {
    await testDatabase.setup()
    const registers = await containerRegisters()
    await setupTestServer.setup(registers)
  })

  afterEach(async () => {
    await testDatabase.destroy()
    await setupTestServer.destroy()
  })

  describe('GET /admin/:productId/custom-product-attributes', () => {
    let productId: string

    describe('when custom product attributes exists', () => {
      beforeEach(async () => {
        productId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"

        // TODO: find a cleaner way to get this done
        const repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)
        const customProductAttributeEntity = await repository.create({
          key: "test",
          value: "value",
          product_id: productId
        })

        await repository.save(customProductAttributeEntity)
      })

      it("returns an array of custom product attributes for a product", async () => {
        const api = setupTestServer.getApi()
        const res = await api.get(`/admin/${productId}/custom-product-attributes`)
        const data = res.data.data

        expect(res.status).toEqual(200)
        expect(data.length).toEqual(1)
        expect(data[0]).toEqual(
          expect.objectContaining({
            key: "test",
            value: "value",
            product_id: productId
          })
        )
      })
    })

    describe('when custom product attributes are not present', () => {
      it("returns an empty array", async () => {
        const api = setupTestServer.getApi()
        const res = await api.get(`/admin/${productId}/custom-product-attributes`)
        const data = res.data.data

        expect(res.status).toEqual(200)
        expect(data.length).toEqual(0)
      })
    })
  })
})