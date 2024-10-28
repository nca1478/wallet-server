import * as bcrypt from "bcrypt";
import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";
import { ColumnCommon, Customer } from "./index";

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
}

@Entity("orders")
export class Order extends ColumnCommon {
  //   @Column({ type: "varchar", nullable: true })
  //   sessionId!: string;

  @Column({ type: "varchar", nullable: true })
  tokenConfirm!: string;

  @Column({ type: "numeric", default: 0 })
  amount!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @ManyToOne(() => Customer, (customer) => customer.order)
  @JoinColumn()
  customer!: Customer;

  @BeforeInsert()
  async transform() {
    if (this.tokenConfirm) {
      const salt = await bcrypt.genSalt(10);
      this.tokenConfirm = await bcrypt.hash(this.tokenConfirm, salt);
    }
  }
}
