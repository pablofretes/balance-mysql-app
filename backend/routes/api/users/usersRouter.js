const router = require('express').Router();
const { User } = require('../../../db');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'Email must be correct format').isEmail()
],async (req, res) => {

  const email = req.body.email;
  const username = req.body.username;
  const existingEmail = await User.findOne({ where: { email: email } });
  const existingUsername = await User.findOne({ where: { username: username } });

  if(existingUsername) {
    return res.status(409).json({ error: `An account with this username: ${username} already exists, please use another one`});
  };

  if(existingEmail) {
    return res.status(409).json({ error: `An account with this email: ${email} already exists, please use another one`});
  };

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }

  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = await User.create(req.body);
  res.json(user);
});

router.post('/login', async(req, res) => {
  const user = await User.findOne({ where: { email: req.body.email }});

  if(user){
    const passConfirm = bcrypt.compareSync(req.body.password, user.password);
    if(passConfirm) {
      const userAndToken = {
        userId: user.id,
        token: createToken(user),
      };
      res.json(userAndToken);
    } else {
      res.json({ error: 'Invalid credentials' });
    }
  } else {
    res.json({ error: 'Invalid credentials' });
  }
});

const createToken = (user) => {
  const payload = {
    userId: user.id,
    createdAt: moment().unix()
  }

  return jwt.encode(payload, process.env.SECRET);
}

module.exports = router;