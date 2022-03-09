const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
  if(req.headers['user-balance-token']) {
    return res.json({ error: 'User token is required in headers'});
  }

  const userToken = req.headers['user-balance-token'];
  let payload = {};

  try {
    payload = jwt.decode(userToken, process.env.SECRET);
  } catch (error) {
    return res.json({ error: 'token is incorrect'});
  }

  if(payload.expiredAt) {
    return res.json({ error: 'token has expired'});
  }
  
  req.userId = payload.userId;

  next()
}

module.exports = {
  checkToken: checkToken
}