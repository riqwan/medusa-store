import { Request, Response } from "express"
import CustomProductAttributeService from '../../../services/custom-product-attribute'

export async function customProductAttributesListHandler(req: Request, res: Response) : Promise<void> {
  const { scope, params } = req
  const { productId } = params

  const customProductAttributeService: CustomProductAttributeService = scope.resolve("customProductAttributeService")
  const customProductAttributes = await customProductAttributeService.list(productId)

  res.json({
    data: customProductAttributes
  })
}
