const router = require('express').Router();
const middlewares = require('./middlewares');
const apiBalanceRouter = require('./api/balance/balanceRouter');
const apiUsersRouter = require('./api/users/usersRouter');

router.use('/movements', apiBalanceRouter);
router.use('/user', apiUsersRouter);

module.exports = router;