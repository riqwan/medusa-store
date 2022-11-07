import { Request, Response, Router } from "express"

type CustomProductAttributesResponse = {
  data: CustomProductAttribute[]
}

export default () => {
  const router = Router()

  router.get(
    "/admin/:productId/custom-product-attributes",
    async (req: Request, res: Response) : Promise<CustomProductAttributesResponse> => {
      const { scope, params } = req
      const { productId } = params
      const customProductAttributeService = scope.resolve("customProductAttributeService")

      const customProductAttributes = await customProductAttributeService.list(productId)

      res.json({
        data: customProductAttributes
      })
    }
  )

  return router
}
