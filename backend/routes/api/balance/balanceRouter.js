const router = require('express').Router();
const { Balance, Movement, User } = require('../../../db');

router.get('/:id', async (req, res) => {
  const currentBalance = await Balance.findOne({ where: { fk_user: req.params.id } });
  const recentMovements = await Movement.findAll({ where: { fk_user: req.params.id } });

  if(currentBalance) {
    const startingBalance = currentBalance.initialAmount;
    if(recentMovements.length !== 0){
      const newAmount = recentMovements.reduce((acc, cur) => {
        if(cur.type === 'positive'){
          acc += cur.amount;
        }
    
        if(cur.type === 'negative'){
          acc -= cur.amount;
        }
    
        return acc;
      }, 0);

      currentBalance.total = startingBalance + newAmount;

      await currentBalance.save();

      const responseObject = {
        balance: currentBalance,
        moves: recentMovements,
      };
  
      res.json(responseObject);
    } else {
      currentBalance.total = startingBalance;

      await currentBalance.save();
  
      const responseObject = {
        balance: currentBalance,
        moves: [],
      };

      res.json(responseObject);
    }
  } else {
    const responseObject = {
      balance: {},
      moves: [],
    };

    res.json(responseObject);
  }
});

router.post('/post/balance/:id')

router.post('/post/:id', async (req, res) => {
  const balance = {
    initialAmount: req.body.amount,
    fk_user: req.params.id
  };

  const newBalance = await Balance.create(balance);

  res.json({ balance: newBalance, moves: [] });
});

router.post('/add/:id', async (req, res) => {

  const movement = {
    amount: req.body.amount,
    type: req.body.type,
    concept: req.body.concept,
    fk_user: req.params.id,
  };

  if(movement) {
    const newMovement = await Movement.create(movement);
    res.json(newMovement);
  } else {
    res.json({ error: 'Incorrect movement body' });
  }

});

router.put('/update/:id', async (req, res) => {
  const movementToUpdate = await Movement.findOne({ where: { id: req.body.id } });

  if(movementToUpdate) {
    await movementToUpdate.update({ type: req.body.type });
    await movementToUpdate.update({ concept: req.body.concept });
    await movementToUpdate.update({ amount: req.body.amount });
    const updated = await movementToUpdate.save();
    res.json(updated);
  } else {
    res.json({ error: 'User id not defined' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const movementToDelete = await Movement.findOne({ where: { id: req.params.id } });
  await movementToDelete.destroy();
});

router.get('/movement/:id', async (req, res) => {
  const movement = await Movement.findOne({ where: { id: req.params.id } });

  if(movement) {
    res.json(movement);
  } else {
    res.json('Movement ID not defined/not found');
  };
});

module.exports = router;