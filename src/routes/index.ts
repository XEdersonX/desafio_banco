import { Router } from 'express';

import accountsRouter from './accounts.routes';
import accountsHistoriesRouter from './accounts_histories.routes';
import searchAccountRouter from './search_account.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/accounts', accountsRouter); // Mostra todas as contas.
routes.use('/accounts_histories', accountsHistoriesRouter); // Mostra o extrato da conta.
routes.use('/search_account', searchAccountRouter); // Mostra os dados de uma conta especifica.
routes.use('/sessions', sessionsRouter); // Rota para realizar o login

export default routes;
