import { Entity, Column, OneToOne } from "typeorm";
import { ColumnCommon, Customer } from "./index";

@Entity("wallets")
export class Wallet extends ColumnCommon {
  @Column({ type: "varchar", nullable: true })
  sessionId!: string;

  @Column({ type: "varchar", nullable: true })
  tokenId!: string;

  @Column({ type: "numeric", default: 0 })
  available!: number;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer!: Customer;
}
