const express = require('express')
const bodyPraser = require('body-parser');

const app = express()
const port = 3000

const subscribers = [];

app.use(bodyPraser.urlencoded({ extended: false }));
app.use(bodyPraser.json());


const generateReferralCode = () => {
  return (Math.random() + 1).toString(36).substring(7);
}

const validateEmail = (email) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isValid = emailRegexp.test(email);
  console.log('isValid::: ', isValid);
  return isValid
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/subscribe', (req, res) => {
  const { body: { email, code } } = req;
  console.log('email:::', email);
  console.log('code:::', code);

  if (!email) {
    throw new Error('You must subscribe using an email');
  }

  // validate the email
  if (!validateEmail(email)) {
    throw new Error('You must subscribe using a valid email');
  } 

  console.log('subscribers:::', subscribers);
  res.send("Thank you for subscribing to the Skimm'fluencer!")
})

app.get('/referrals/:email', function (req, res) {
  console.log('req.params:::', req.params);

  res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})