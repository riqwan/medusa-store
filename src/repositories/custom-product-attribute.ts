import { EntityRepository, Repository } from "typeorm"

import CustomProductAttribute from "../models/custom-product-attribute"

@EntityRepository(CustomProductAttribute)
export default class CustomProductAttributeRepository extends Repository<CustomProductAttribute> { }
