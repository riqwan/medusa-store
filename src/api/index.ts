import { Request, Response, Router } from "express"
import CustomProductAttributeService from '../services/custom-product-attribute'
import {
  customProductAttributesListHandler,
  customProductAttributesRetrieveHandler
} from './handlers'

export default () => {
  const router = Router()

  router.get("/admin/:productId/custom-product-attributes", customProductAttributesListHandler)
  router.get("/admin/:productId/custom-product-attributes/:id", customProductAttributesRetrieveHandler)

  return router
}
