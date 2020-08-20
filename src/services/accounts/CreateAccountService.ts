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
    const accountsRepositoy = getRepository(Accounts);

    const checkAccountExists = await accountsRepositoy.findOne({
      where: { cpf },
    });

    if (checkAccountExists) {
      throw new AppError('Cpf already used.');
    }

    let agency = 0;
    let nro_account = 0;
    const exists = false;

    /* function asyncOp(resolve: any, reject: any): any {
      accountsRepositoy
        .findOne({
          where: { agency, nro_account },
        })
        .then(result => {
          if (result.error()) {
            reject(result.error());
          } else if (result.data().length === 0) asyncOp(resolve);
          else resolve(result);
        });
    }

    new Promise((r, j) => asyncOp(r, j)).then((result: any) => {
      console.log(`${result}: This will call if your algorithm succeeds!`);
    }); */

    // -----------

    /* function test(): any {
      let returnSample: any;

      accountsRepositoy
        .findOne({
          where: {
            agency,
            nro_account,
          },
        })
        .then(result => {
          returnSample = result;
        });

      return returnSample;
    }

    let stopped = false;

    while (!stopped) {
      const result = test();

      console.log(result);

      if (!result) stopped = true;
    } */

    function test(): any {
      // 131376
      agency = Math.floor(100000 + Math.random() * 900000);
      nro_account = Math.floor(100000 + Math.random() * 900000);

      accountsRepositoy
        .findOne({
          where: {
            agency,
            nro_account,
          },
        })
        .then(result => result);
    }

    let stopped = false;

    while (!stopped) {
      const result = test();

      console.log(result);

      if (!result) stopped = true;
    }

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
