import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import Account from '../models/Accounts';

interface Request {
  agency: number;
  nro_account: number;
  password: string;
}

interface Response {
  account: Account;
  token: string;
}

class AuthenticateAccountService {
  public async execute({
    agency,
    nro_account,
    password,
  }: Request): Promise<Response> {
    const accountRepository = getRepository(Account);

    const account = await accountRepository.findOne({
      where: { agency, nro_account },
      select: ['id', 'agency', 'nro_account', 'cpf', 'password'],
    });

    if (!account) {
      console.log('conta não existe');
      throw new AppError(
        'Incorrect agency/nro. account/password combiation.',
        401,
      );
    }

    if (account.agency !== agency) {
      console.log(`agência incorreta ${account.agency} | ${agency}`);
      throw new AppError(
        'Incorrect agency/nro. account/password combiation.',
        401,
      );
    }

    if (account.nro_account !== nro_account) {
      console.log('nro conta incorreta');
      throw new AppError(
        'Incorrect agency/nro. account/password combiation.',
        401,
      );
    }

    const passwordMatched = await compare(password, account.password);

    if (!passwordMatched) {
      console.log('senha incorreta');
      throw new AppError(
        'Incorrect agency/nro. account/password combiation.',
        401,
      );
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: account.id,
      expiresIn,
    });

    return { account, token };
  }
}

export default AuthenticateAccountService;
