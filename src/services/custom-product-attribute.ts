import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm"

import CustomProductAttributeRepository from '../repositories/custom-product-attribute'
import CustomProductAttribute from '../models/custom-product-attribute'

type ConstructorOptions = {
  manager: EntityManager,
  customProductAttributeRepository: CustomProductAttributeRepository,
}

class CustomProductAttributeService extends BaseService {
  protected customProductAttributeRepository_: CustomProductAttributeRepository

  constructor(options: ConstructorOptions) {
    super()

    this.customProductAttributeRepository_ = options.customProductAttributeRepository
    this.manager_ = options.manager
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

  async retrieve(productId: string, id: string): Promise<CustomProductAttribute | undefined> {
    const customProductAttributeRepository: CustomProductAttributeRepository =
      this.manager_.getCustomRepository(this.customProductAttributeRepository_)

    return await customProductAttributeRepository.findOne({
      where: {
        id,
        product_id: productId
      }
    })
  }
}

export default CustomProductAttributeService