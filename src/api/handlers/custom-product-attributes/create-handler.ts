import { Request, Response } from "express"
import CustomProductAttributeService from '../../../services/custom-product-attribute'

export async function customProductAttributesCreateHandler(req: Request, res: Response) : Promise<void> {
  const { scope, params } = req
  const { productId, key, value } = params
  const customProductAttributeService: CustomProductAttributeService = scope.resolve("customProductAttributeService")

  const customProductAttribute = await customProductAttributeService.create(productId, {
    key,
    value
  })

  res.json({
    data: customProductAttribute
  })
}
