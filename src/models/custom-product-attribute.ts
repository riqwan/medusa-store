import { BeforeInsert, Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity} from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class CustomProductAttribute extends BaseEntity {
  @Index()
  @Column()
  product_id: string

  @Column({ type: "varchar" })
  key: string;

  @Column({ type: "varchar" })
  value: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "prod_attr")
  }
}
