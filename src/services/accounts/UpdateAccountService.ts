import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import Accounts from '../../models/Accounts';

interface Request {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  email: string;
  agency: number;
  nro_account: number;
  password: string;
}

class UpdateAccountService {
  public async execute({
    id,
    name,
    cpf,
    rg,
    email,
    agency,
    nro_account,
    password,
  }: Request): Promise<Accounts> {
    const accountRepository = getRepository(Accounts);

    const account = await accountRepository.findOne(id);

    if (!account) {
      throw new AppError('Account not found.');
    }

    const checkAccountExist = await accountRepository.findOne({
      where: { cpf },
    });

    if (checkAccountExist && account.cpf !== cpf) {
      throw new AppError('Cpf already used.');
    }

    const hashedPassword = await hash(password, 8);

    account.name = name;
    account.cpf = cpf;
    account.rg = rg;
    account.agency = agency;
    account.nro_account = nro_account;
    account.password = hashedPassword;
    account.email = email;

    await accountRepository.save(account);

    return account;
  }
}

export default UpdateAccountService;
