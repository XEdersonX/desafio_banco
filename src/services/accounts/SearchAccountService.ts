import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Accounts from '../../models/Accounts';

interface Request {
  id: string;
}

class SearchAccountService {
  public async execute({ id }: Request): Promise<Accounts> {
    const accountsRepositoy = getRepository(Accounts);

    const checkAccountExists = await accountsRepositoy.findOne({
      where: { id },
    });

    if (!checkAccountExists) {
      throw new AppError('Account not found.');
    }

    return checkAccountExists;
  }
}

export default SearchAccountService;
