This is Kai Yu's Skimm'fluencer newsletter. This API contains 2 routes:
POST: `/subscribe`
GET: `/referrals/:email` 

`Getting Started`

```npm install```

Usage
Start the server
```nodemon server.js```

The server initializes with no subscribers. Hit endpoints to subscribe.


Skimm'fluencer API:


POST: `localhost:3000/subscribe`
Subscribe to the newsletter given an email, and returns a referral code.
If a referral code is passed as part of `data`, this endpoint will increment the referral count for the given email

```
data:
{
  email: types.string,
  code: types.string,
}
```


GET: `localhost:3000/referrals/:email` 
Returns the current referral count from this email