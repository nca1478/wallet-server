import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { ColumnCommon, Customer } from "./index";

@Entity("wallets")
export class Wallet extends ColumnCommon {
  @Column({ type: "varchar", nullable: true })
  sessionId?: string;

  @Column({ type: "varchar", nullable: true })
  tokenConfirm?: string;

  @Column({ type: "numeric", default: 0 })
  available?: number;

  @ManyToOne(() => Customer, (customer) => customer.user)
  @JoinColumn()
  customer!: Customer;
}