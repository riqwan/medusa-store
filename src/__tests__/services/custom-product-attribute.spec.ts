// import { jest } from '@jest/globals';

import { CustomProductAttribute } from "../../models/custom-product-attribute"
import CustomProductAttributeService from "../../services/custom-product-attribute"
import { CustomProductAttributeRepository } from "../../repositories/custom-product-attribute"
import { CustomProductAttributeServiceOptions } from "../../types/services/custom-product-attribute"
import { testDatabase } from '../../test-helpers/test-database'

describe('Model: CustomProductAttribute', () => {
  beforeEach(async () => { await testDatabase.setup() })
  afterEach(async () => { await testDatabase.destroy() })

  describe('#retrieve', () => {
    let expectedProductId: string
    let repository: CustomProductAttributeRepository
    let customProductAttributeRecord: CustomProductAttribute

    beforeEach(async () => {
      expectedProductId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"
      repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)

      let customProductAttributeEntity = await repository.create({
        key: "test",
        value: "value",
        product_id: expectedProductId
      })

      customProductAttributeRecord = await repository.save(customProductAttributeEntity)
    })

    it("should return a custom product attribute when productId and customProductAttributeId are valid", async () => {
      const serviceOptions: CustomProductAttributeServiceOptions = {
        customProductAttributeRepository: repository,
      }

      const service = new CustomProductAttributeService(serviceOptions)
      const record = await service.retrieve(expectedProductId, customProductAttributeRecord.id)

      expect(record).toEqual(customProductAttributeRecord)
    })

    it("should return null when productId is invalid", async () => {
      const invalidProductId = 'invalid-product-id'
      const serviceOptions: CustomProductAttributeServiceOptions = {
        customProductAttributeRepository: repository,
      }

      const service = new CustomProductAttributeService(serviceOptions)
      const record = await service.retrieve(invalidProductId, customProductAttributeRecord.id)

      expect(record).toEqual(undefined)
    })

    it("should return null when customProductAttribute.id is invalid", async () => {
      const invalidCPAId = 'invalid-cpa-id'
      const serviceOptions: CustomProductAttributeServiceOptions = {
        customProductAttributeRepository: repository,
      }

      const service = new CustomProductAttributeService(serviceOptions)
      const record = await service.retrieve(expectedProductId, invalidCPAId)

      expect(record).toEqual(undefined)
    })
  })

  describe('#list', () => {
    let expectedProductId: string
    let repository: CustomProductAttributeRepository
    let customProductAttributeRecord: CustomProductAttribute

    beforeEach(async () => {
      expectedProductId = "prod_01GHPFPC8EX6JEEN7457B5C0D4"
      repository = await testDatabase.getConnection().getRepository(CustomProductAttribute)
      let customProductAttributeEntity = await repository.create({
        key: "test",
        value: "value",
        product_id: expectedProductId
      })

      customProductAttributeRecord = await repository.save(customProductAttributeEntity)
    })

    describe('when custom product attributes exist for a valid productId', () => {
      it("should return a list of custom product attribute", async () => {
        const findOneSpy = jest.spyOn(repository, 'find')
        const serviceOptions: CustomProductAttributeServiceOptions = {
          customProductAttributeRepository: repository,
        }

        const service = new CustomProductAttributeService(serviceOptions)
        const results = await service.list(expectedProductId)

        expect(results.length).toEqual(1)
        expect(results[0]).toEqual(customProductAttributeRecord)
        expect(findOneSpy).toHaveBeenCalledTimes(1)
        expect(findOneSpy).toHaveBeenCalledWith({ where: { product_id: expectedProductId }})
      })
    })

    describe('when custom product attributes does not exist for a productId', () => {
      beforeEach(async () => {
        expectedProductId = "random-product-id"
      })

      it("should return an empty list", async () => {
        const findOneSpy = jest.spyOn(repository, 'find')
        const serviceOptions: CustomProductAttributeServiceOptions = {
          customProductAttributeRepository: repository,
        }

        const service = new CustomProductAttributeService(serviceOptions)
        const results = await service.list(expectedProductId)

        expect(results.length).toEqual(0)
        expect(findOneSpy).toHaveBeenCalledTimes(1)
        expect(findOneSpy).toHaveBeenCalledWith({ where: { product_id: expectedProductId }})
      })
    })
  })
})