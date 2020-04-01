## Mazzuma Node
A small wrapper around mazzuma api

### Installation

```
npm i mazzuma-node
```


### Usage

```javascript

const mazzumaNode = require("mazzuma-node")

const client = mazzumaNode(apiKey)

```

#### Money Money Payment 
Check docs for payload https://mazzuma.com/developer/

``` javascript
await client.mobileMoneyPayment({
  "price": 1,
  "network": "mtn",
  "recipient_number": "026xxxxxxx",
  "sender": "024xxxxxxx",
  "option": "rmta",
  "apikey": "",
  "orderID": ""
})
```

#### Send Mazzuma Tokens
Check docs for payload https://mazzuma.com/developer/

``` javascript
await client.sendTokens({
  "price": 1,
  "recipient": "026xxxxxxx",
  "sender": "024xxxxxxx"
})
```

#### Receive Mazzuma Tokens
Check docs for payload https://mazzuma.com/developer/


``` javascript
await client.receiveTokens({
  "option": 1,
  "callback_url": "https://testurl/callback",
  "sender": "024xxxxxxx"
})
```


#### Checking Transaction Status
Check docs for payload https://mazzuma.com/developer/


``` javascript
await client.checkTransactionStatus(hash)
```

#### Get Account Balance

Check docs for payload https://mazzuma.com/developer/


``` javascript
await client.checkAccountBalance()
```

#### Validate Account

Check docs for payload https://mazzuma.com/developer/

``` javascript
await client.validateAccount(username)
```



HAPPY HACKING ❤



