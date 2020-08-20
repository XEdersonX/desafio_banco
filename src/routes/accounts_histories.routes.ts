import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ListAccountsHistoriesService from '../services/accounts_histories/ListAccountsHistoriesService';
import CreateAccountHistorieService from '../services/accounts_histories/CreateAccountHistorieService';
import DeleteAccountHistorieService from '../services/accounts_histories/DeleteAccountHistorieService';

import AccountsHistoriesRepository from '../repositories/AccountsHistoriesRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const accountHistoryRouter = Router();

accountHistoryRouter.use(ensureAuthenticated);

accountHistoryRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const accountsHistoriesRepository = getCustomRepository(
    AccountsHistoriesRepository,
  );

  const listAccountsHistories = new ListAccountsHistoriesService();

  const accountsHistories = await listAccountsHistories.execute({
    account_id: id,
  });

  const balance = await accountsHistoriesRepository.getBalance();

  return response.json({ accountsHistories, balance });
});

accountHistoryRouter.post('/', async (request, response) => {
  const { account_id, type, value } = request.body;

  const createAccountHistory = new CreateAccountHistorieService();

  const accountHistory = await createAccountHistory.execute({
    account_id,
    type,
    value,
  });

  return response.json(accountHistory);
});

// accountHistoryRouter.put('/:id', async (request, response) => {
//   const { id } = request.params;
//   const { account_id, type, value } = request.body;
// });

accountHistoryRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteAccountHistory = new DeleteAccountHistorieService();

  const message = await deleteAccountHistory.execute({ id });

  return response.json({ message });
});

export default accountHistoryRouter;
