import { BaseService } from "medusa-interfaces";

import { CustomProductAttributeRepository } from '../repositories/custom-product-attribute'
import { CustomProductAttribute } from '../models/custom-product-attribute'
import { CustomProductAttributeServiceOptions } from '../types/services/custom-product-attribute'

class CustomProductAttributeService extends BaseService {
  protected customProductAttributeRepository_: CustomProductAttributeRepository

  constructor(options: CustomProductAttributeServiceOptions) {
    super()

    this.customProductAttributeRepository_ = options.customProductAttributeRepository
  }

  async list(productId: string): Promise<CustomProductAttribute[]> {
    return await this.customProductAttributeRepository_.find({
      where: {
        product_id: productId
      }
    })
  }

  async retrieve(productId: string, id: string): Promise<CustomProductAttribute | undefined> {
    return await this.customProductAttributeRepository_.findOne({
      where: {
        id,
        product_id: productId
      }
    })
  }
}

export default CustomProductAttributeService