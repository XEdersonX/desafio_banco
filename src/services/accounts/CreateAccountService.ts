import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import Accounts from '../../models/Accounts';

interface Request {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
}

class CreateAccountService {
  public async execute({
    name,
    cpf,
    rg,
    email,
    password,
  }: Request): Promise<Accounts> {
    let agency = 0;
    let nro_account = 0;

    const accountsRepositoy = getRepository(Accounts);

    if (cpf.length > 11) {
      throw new AppError('Cpf length greater than 11.');
    }

    if (rg.length > 12) {
      throw new AppError('RG length greater than 12.');
    }

    const checkAccountExists = await accountsRepositoy.findOne({
      where: { cpf },
    });

    if (checkAccountExists) {
      throw new AppError('Cpf already used.');
    }

    const checkAccountExistsRG = await accountsRepositoy.findOne({
      where: { rg },
    });

    if (checkAccountExistsRG) {
      throw new AppError('RG already used.');
    }

    const checkAccountExistsEmail = await accountsRepositoy.findOne({
      where: { email },
    });

    if (checkAccountExistsEmail) {
      throw new AppError('Email already used.');
    }

    function asyncOp(resolve: any) {
      agency = Math.floor(100000 + Math.random() * 900000);
      nro_account = Math.floor(100000 + Math.random() * 900000);

      // if (changeNumber === 1) nro_account = 538434;

      accountsRepositoy
        .findOne({
          where: [{ agency }, { nro_account }],
        })
        .then(result => {
          if (result) {
            // console.log('yes');
            // changeNumber += 1;
            asyncOp(resolve);
          } else {
            // console.log('no');

            // e para dizer sucesso para finalizar.
            resolve();

            // para enviar um resultado para o resolve da promise
            // resolve(result);
          }
        });
    }

    // await new Promise((resolve, reject) => asyncOp(resolve));
    await new Promise(resolve => asyncOp(resolve));

    // ------------
    /* while (exists !== false) {
      agency = Math.floor(100000 + Math.random() * 900000);
      nro_account = Math.floor(100000 + Math.random() * 900000);

      const checkAccountExistsAgencyNroAccount = await accountsRepositoy.findOne(
        {
          where: { agency, nro_account },
        },
      );

      if (!checkAccountExistsAgencyNroAccount) {
        exists = true;
      }
    } */

    const hashedPassword = await hash(password, 8);

    const account = accountsRepositoy.create({
      name,
      cpf,
      rg,
      email,
      agency,
      nro_account,
      password: hashedPassword,
    });

    await accountsRepositoy.save(account);

    return account;
  }
}

export default CreateAccountService;
