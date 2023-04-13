import { Request, Response } from "express"
import CustomProductAttributeService from '../../../services/custom-product-attribute'

export async function customProductAttributesRetrieveHandler(req: Request, res: Response) : Promise<void> {
  const { scope, params } = req
  const { productId, id } = params
  const customProductAttributeService: CustomProductAttributeService = scope.resolve("customProductAttributeService")

  const customProductAttribute = await customProductAttributeService.retrieve(productId, id)

  res.json({
    data: customProductAttribute
  })
}
