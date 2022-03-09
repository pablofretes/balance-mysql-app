const router = require('express').Router();
const { Balance, Movement, User } = require('../../../db');

router.get('/:id', async (req, res) => {
  const currentBalance = await Balance.findOne({ where: { fk_user: req.params.id } });
  const recentMovements = await Movement.findAll({ where: { fk_user: req.params.id } });

  if(currentBalance) {
    currentBalance.total = recentMovements.reduce((acc, cur) => {
      if(cur.type === 'positive'){
        acc += cur.amount;
      }
  
      if(cur.type === 'negative'){
        acc -= cur.amount;
      }
  
      return acc;
    }, 0);
  }

  const responseObject = {
    balance: currentBalance,
    moves: recentMovements,
  };

  res.json(responseObject);
});

router.post('/post/:id', async (req, res) => {

  console.log(req.body, 'asdjkaldkjasd');
  const balance = {
    total: req.body.amount,
    fk_user: req.params.id
  }

  const movement = {
    amount: req.body.amount,
    type: req.body.type,
    concept: req.body.concept,
    fk_user: req.params.id,
  };

  console.log(movement, 'movement');

  const newBalance = await Balance.create(balance);
  const newMovement = await Movement.create(movement);
  console.log(newBalance, newMovement)

  res.json({ balance: newBalance, movement: newMovement });
});

router.post('/update/:id', async (req, res) => {
  const currentBalance = await Balance.findOne({ where: { fk_user: req.params.id } });
  
  const movement = {
    amount: req.body.amount,
    type: req.body.type,
    concept: req.body.concept,
    fk_user: req.params.id,
  };

  if(currentBalance) {
    await Movement.create(movement);
    const recentMovements = await Movement.findAll({ where: { fk_user: req.params.id } });
    currentBalance.total = recentMovements.reduce((acc, cur) => {
      if(cur.type === 'positive'){
        acc += cur.amount;
      }
  
      if(cur.type === 'negative'){
        acc -= cur.amount;
      }
  
      return acc;
    }, 0);
    const responseObject = {
      balance: currentBalance,
      moves: recentMovements,
    };
    res.json(responseObject);
  } else {
    res.json({ error: 'User id not defined' });
  }

});

module.exports = router;