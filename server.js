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
  return isValid
}

const createSubscriber = (email) => {
  const code = generateReferralCode();
  return {
    email: email,
    code: code,
    referralCount: 0,
    createdAt: new Date(),
  }
}

const findSubscriber = (email) => {
  const sub = subscribers.filter((sub) => {
    return sub.email === email
  })[0];

  if (!sub) {
    throw new Error('No subscriber was found with this email.')
  }

  return sub;
};

// increment the referralCount of the user that generated the code
const referralUsed = (code) => {
  const sub = subscribers.filter((sub) => {
    return sub.code === code
  })[0];

  if (!sub) {
    console.log('No subscriber was found with this referral code.');
    return;
  }

  const count = sub.referralCount = sub.referralCount + 1;
  console.log(`Someone used your referral code, ${sub.email}! Your current referral count is: ${count}`);
  return count;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/subscribe', (req, res) => {
  const { body: { email, code } } = req;

  if (!email) {
    throw new Error('You must subscribe using an email');
  }

  // validate the email
  if (!validateEmail(email)) {
    throw new Error('You must subscribe using a valid email');
  } 

  const sub = createSubscriber(email);

  if (code) {
    referralUsed(code);
  }

  subscribers.push(sub);

  res.send(`Thank you for subscribing to the Skimm'fluencer! Use your referral code (${sub.code}) to get bonuses!`)
})

// get referral count from email
app.get('/referrals/:email', function (req, res) {
  const { params: { email } } = req;

  const sub = findSubscriber(email);
  res.send(`Referral count: ${sub.referralCount}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})