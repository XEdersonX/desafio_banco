import { Router } from 'express';

import AuthenticateAccountService from '../services/AuthenticateAccountService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { agency, nro_account, password } = request.body;

  const authenticateAccount = new AuthenticateAccountService();

  const { account, token } = await authenticateAccount.execute({
    agency,
    nro_account,
    password,
  });

  delete account.password;

  return response.json({ account, token });
});

export default sessionsRouter;
