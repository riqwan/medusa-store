import { CustomProductAttribute } from "../../models/custom-product-attribute"
import { testDatabase } from '../../test-helpers/test-database'
import { setupTestServer } from '../../test-helpers/setup-test-server'
import Router from '../../api'
import CustomProductAttributeService from "../../services/custom-product-attribute"
import { CustomProductAttributeServiceOptions } from "../../types/services/custom-product-attribute"
import { AwilixContainer } from "awilix"
import { Express } from "express"
import { ContainerRegister } from '../../types/tests'

jest.setTimeout(60000)

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

  beforeAll(async () => {
    await testDatabase.setup()
    const registers = await containerRegisters()
    await setupTestServer.setup(registers)
  })

  afterAll(async () => {
    await setupTestServer.destroy()
    await testDatabase.destroy()
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

  describe('GET /admin/:productId/custom-product-attributes/:id', () => {
    let productId: string
    let customProductAttributeId: string

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

        const customProductAttribute = await repository.save(customProductAttributeEntity)

        customProductAttributeId = customProductAttribute.id
      })

      it("returns a custom product attribute for a product", async () => {
        const api = setupTestServer.getApi()
        const res = await api.get(`/admin/${productId}/custom-product-attributes/${customProductAttributeId}`)
        const data = res.data.data

        expect(res.status).toEqual(200)
        expect(data).toEqual(
          expect.objectContaining({
            id: customProductAttributeId,
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
        const res = await api.get(`/admin/${productId}/custom-product-attributes/random`)
        const data = res.data.data

        expect(res.status).toEqual(200)
        // expect(data).toEqual({})
      })
    })
  })

  describe('POST /admin/:productId/custom-product-attributes', () => {
    let productId: string

    describe('when custom product attributes exists', () => {
      it("returns an array of custom product attributes for a product", async () => {
        const api = setupTestServer.getApi()
        const res = await api.post(`/admin/${productId}/custom-product-attributes`)
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