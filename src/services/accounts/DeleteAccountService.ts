import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Accounts from '../../models/Accounts';

interface Request {
  id: string;
}

class DeleteAccountService {
  public async execute({ id }: Request): Promise<string> {
    const accountRepository = getRepository(Accounts);

    const account = await accountRepository.findOne(id);

    if (!account) {
      throw new AppError('Account not found.');
    }

    await accountRepository.delete(account.id);

    return 'Deleted account.';
  }
}

export default DeleteAccountService;
