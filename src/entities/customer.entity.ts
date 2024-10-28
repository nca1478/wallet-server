import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ColumnCommon, User, Wallet } from "./index";
import { Order } from "./index";

@Entity("customers")
export class Customer extends ColumnCommon {
  @Column("varchar")
  name!: string;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar")
  cellular!: string;

  @Column("varchar")
  dni!: string;

  @BeforeInsert()
  async emailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Wallet, (wallet) => wallet.customer)
  wallet!: Wallet[];

  @OneToMany(() => Order, (order) => order.customer)
  order!: Order[];
}
