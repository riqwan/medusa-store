import { CustomProductAttributeRepository } from "../../repositories/custom-product-attribute"

export type CustomProductAttributeServiceOptions = {
  customProductAttributeRepository: CustomProductAttributeRepository,
}

export type CustomProductAttributeCreateParams = {
  key: string,
  value: string,
}
