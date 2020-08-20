import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import AccountsHistoriesRepository from '../../repositories/AccountsHistoriesRepository';

interface Request {
  id: string;
}

class DeleteAccountHistorieService {
  public async execute({ id }: Request): Promise<string> {
    const accountsHistoriesRepository = getCustomRepository(
      AccountsHistoriesRepository,
    );

    const accountHistory = await accountsHistoriesRepository.findOne({
      where: { id },
    });

    if (!accountHistory) {
      throw new AppError('Transaction not found.');
    }

    await accountsHistoriesRepository.delete(accountHistory.id);

    return 'Deleted transaction.';
  }
}

export default DeleteAccountHistorieService;
