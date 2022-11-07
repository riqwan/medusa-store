import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm"

import CustomProductAttributeRepository from '../repositories/custom-product-attribute'
import CustomProductAttribute from '../models/custom-product-attribute'

class CustomProductAttributeService extends BaseService {
  protected manager_: EntityManager
  protected customProductAttributeRepository_: typeof CustomProductAttributeRepository

  constructor({ customProductAttributeRepository, manager }) {
    super()

    this.customProductAttributeRepository_ = customProductAttributeRepository
    this.manager_ = manager
  }

  async list(productId: string): Promise<CustomProductAttribute[]> {
    const customProductAttributeRepository: CustomProductAttributeRepository =
      this.manager_.getCustomRepository(this.customProductAttributeRepository_)

    return await customProductAttributeRepository.find({
      where: {
        product_id: productId
      }
    })
  }
}

export default CustomProductAttributeService