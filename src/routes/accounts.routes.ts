import { Router } from 'express';
import { getRepository } from 'typeorm';

import Accounts from '../models/Accounts';

import CreateAccountService from '../services/accounts/CreateAccountService';
import UpdateAccountService from '../services/accounts/UpdateAccountService';
import DeleteAccountService from '../services/accounts/DeleteAccountService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const accountRouter = Router();

// accountRouter.use(ensureAuthenticated);

accountRouter.get('/', ensureAuthenticated, async (request, response) => {
  const accountsRepository = getRepository(Accounts);

  const accounts = await accountsRepository.find();

  return response.json(accounts);
});

accountRouter.post('/', async (request, response) => {
  const { name, cpf, rg, email, password } = request.body;

  const createAccount = new CreateAccountService();

  const account = await createAccount.execute({
    name,
    cpf,
    rg,
    email,
    password,
  });

  delete account.password; // para deletar esta informacao do json que vai ser exibido.

  return response.json(account);
});

accountRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { name, cpf, rg, email, agency, nro_account, password } = request.body;

  const updateAccount = new UpdateAccountService();

  const account = await updateAccount.execute({
    id,
    name,
    cpf,
    rg,
    email,
    agency,
    nro_account,
    password,
  });

  delete account.password;

  return response.json(account); // para deletar esta informacao do json que vai ser exibido.
});

accountRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteAccount = new DeleteAccountService();

  const message = await deleteAccount.execute({ id });

  return response.json({ message });
});

export default accountRouter;
