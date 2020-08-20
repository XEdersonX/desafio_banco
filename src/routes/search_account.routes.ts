import { Router } from 'express';

import SearchAccountService from '../services/accounts/SearchAccountService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const searchAccountRouter = Router();

searchAccountRouter.use(ensureAuthenticated);

searchAccountRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const searchAccount = new SearchAccountService();

  const account = await searchAccount.execute({
    id,
  });

  delete account.password; // para deletar esta informacao do json que vai ser exibido.

  return response.json(account);
});

export default searchAccountRouter;
