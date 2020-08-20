import { EntityRepository, Repository } from 'typeorm';

import AccountsHistories from '../models/AccountsHistories';

interface Balance {
  input: number;
  exit: number;
  total: number;
}

@EntityRepository(AccountsHistories)
class AccountsHistoriesRepository extends Repository<AccountsHistories> {
  public async getBalance(): Promise<Balance> {
    const balance: Balance = {
      input: 0,
      exit: 0,
      total: 0,
    };

    const accountsHistories = await this.find();

    accountsHistories.map(accountHistory => {
      // console.log(`${typeof balance.input}`);
      if (accountHistory.type === 'depósito') {
        balance.input += Number(accountHistory.value);
      } else if (accountHistory.type === 'resgate') {
        balance.exit += Number(accountHistory.value);
      } else if (accountHistory.type === 'pagamento') {
        balance.exit += Number(accountHistory.value);
      }

      // console.log(`${balance.input} | ${accountHistory.value}`);
      // console.log(`${typeof balance.input} | ${typeof accountHistory.value}`);
      // console.log(`${JSON.stringify(accountHistory)}`);

      return balance;
    });

    balance.total = balance.input - balance.exit;

    return balance;
  }
}

export default AccountsHistoriesRepository;
