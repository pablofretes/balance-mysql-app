const router = require('express').Router();
const middlewares = require('./middlewares');
const apiMovementsRouter = require('./api/movements/movementsRouter');
const apiUsersRouter = require('./api/users/usersRouter');
const apiBalanceRouter = require('./api/balance/balanceRouter');

router.use('/movements', middlewares.checkToken, apiMovementsRouter);
router.use('/balance', middlewares.checkToken, apiBalanceRouter);
router.use('/user', apiUsersRouter);

module.exports = router;