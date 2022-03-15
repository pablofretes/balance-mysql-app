const router = require('express').Router();
const { Balance, Movement } = require('../../../db');

router.post('/add/:id', async (req, res) => {

  console.log('add movement', req.body);

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
  console.log('update movement', req.body)

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
  console.log('get movement', req.body)

  if(movement) {
    res.json(movement);
  } else {
    res.json('Movement ID not defined/not found');
  };
});

module.exports = router;