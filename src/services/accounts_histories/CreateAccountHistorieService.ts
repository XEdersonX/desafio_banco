import { getCustomRepository } from 'typeorm';
import AccountsHistories from '../../models/AccountsHistories';
import AppError from '../../errors/AppError';
import AccountsHistoriesRepository from '../../repositories/AccountsHistoriesRepository';

interface Request {
  account_id: string;
  type: 'depósito' | 'resgate' | 'pagamento';
  value: number;
}

class CreateAccountHistorieService {
  public async execute({
    account_id,
    type,
    value,
  }: Request): Promise<AccountsHistories> {
    const accountsHistoriesRepository = getCustomRepository(
      AccountsHistoriesRepository,
    );

    const { total } = await accountsHistoriesRepository.getBalance();

    if ((type === 'pagamento' || type === 'resgate') && value > total) {
      throw new AppError(
        'A transação extrapola o valor total que o usúario tem em conta.',
        400,
      );
    }

    const accountHistory = accountsHistoriesRepository.create({
      account_id,
      type,
      value,
    });

    await accountsHistoriesRepository.save(accountHistory);

    return accountHistory;
  }
}

export default CreateAccountHistorieService;
