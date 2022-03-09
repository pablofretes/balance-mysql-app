const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
  console.log(req.headers)
  if(!req.headers['authorization']) {
    return res.json({ error: 'User token is required in headers'});
  }

  const userToken = req.headers['authorization'].substring(7);
  console.log(userToken)
  let payload = {};

  try {
    payload = jwt.decode(userToken, process.env.SECRET);
  } catch (error) {
    return res.json({ error: 'token is incorrect'});
  }

  /*if(payload.expiredAt) {
    return res.json({ error: 'token has expired'});
  }*/
  
  req.userId = payload.userId;

  next()
}

module.exports = {
  checkToken: checkToken
}