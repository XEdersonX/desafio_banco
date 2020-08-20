import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Accounts from './Accounts';

@Entity('accounts_histories')
class AccountsHistories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_id: string;

  @ManyToOne(() => Accounts, { eager: true })
  @JoinColumn({ name: 'account_id' })
  accounts: Accounts;

  @Column()
  type: string;

  // https://github.com/typeorm/typeorm/issues/1673
  // @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AccountsHistories;
