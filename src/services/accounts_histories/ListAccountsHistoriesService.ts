import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import AccountsHistories from '../../models/AccountsHistories';
import AccountsHistoriesRepository from '../../repositories/AccountsHistoriesRepository';

interface Request {
  account_id: string;
}

class ListAccountsHistoriesService {
  public async execute({ account_id }: Request): Promise<AccountsHistories[]> {
    const accountsHistoriesRepository = getCustomRepository(
      AccountsHistoriesRepository,
    );

    const accountsHistories = await accountsHistoriesRepository.find({
      where: { account_id },
    });

    if (!accountsHistories) {
      throw new AppError('Account History not found.');
    }

    return accountsHistories;
  }
}

export default ListAccountsHistoriesService;
