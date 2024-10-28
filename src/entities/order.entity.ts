import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ColumnCommon, Customer } from "./index";

@Entity("orders")
export class Order extends ColumnCommon {
  //   @Column({ type: "varchar", nullable: true })
  //   sessionId!: string;

  @Column({ type: "varchar", nullable: true })
  tokenConfirm!: string;

  @Column({ type: "numeric", default: 0 })
  amount!: number;

  @ManyToOne(() => Customer, (customer) => customer.order)
  @JoinColumn()
  customer!: Customer;
}
