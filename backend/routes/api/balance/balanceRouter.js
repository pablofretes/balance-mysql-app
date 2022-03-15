const router = require('express').Router();
const { Balance, Movement } = require('../../../db');

router.get('/:id', async (req, res) => {
  const currentBalance = await Balance.findOne({ where: { fk_user: req.params.id } });
  const recentMovements = await Movement.findAll({ where: { fk_user: req.params.id } });
  console.log('recentm', recentMovements)

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

      const tenLastMoves = recentMovements.reverse().slice(0, 10);
      console.log('tenlast', tenLastMoves.length)

      const responseObject = {
        balance: currentBalance,
        moves: tenLastMoves,
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

router.post('/post/:id', async (req, res) => {
  const balance = {
    initialAmount: req.body.amount,
    fk_user: req.params.id
  };

  const newBalance = await Balance.create(balance);
  console.log('newBalance', newBalance)

  res.json({ balance: newBalance, moves: [] });
});

router.put('/update/:id', async (req, res) => {
  const currentBalance = await Balance.findOne({ where: { fk_user: req.params.id } });

  if(currentBalance) {
    currentBalance.initialAmount = req.body.amount;

    await currentBalance.save();

    const responseObject = {
      balance: currentBalance,
      moves: [],
    };

    res.json(responseObject);
  } else {
    res.json('Balance not found');
  }
})

module.exports = router;