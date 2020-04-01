'use strict'

import faker from 'faker'

export const makeSendMobileMoneyParams = ({ overrides = {} } = {}) => {
  const payload = Object.assign({}, overrides)
  return Object.assign(payload, {
    price: faker.random.number(),
    network: 'mtn',
    recipient_number: faker.phone.phoneNumber(),
    sender: faker.phone.phoneNumber(),
    option: 'rmsa'
  })
}

export const makeSendTokensParams = ({ overrides = {} } = {}) => {
  const payload = Object.assign({}, overrides)

  return Object.assign(payload, {
    price: faker.random.number(),
    recipient: faker.phone.phoneNumber(),
    sender: faker.phone.phoneNumber()
  })
}

export const makeReceiveTokensParams = ({ overrides = {} } = {}) => {
  const payload = Object.assign({}, overrides)

  return Object.assign(payload, {
    option: faker.random.alphaNumeric(),
    sender: faker.phone.phoneNumber(),
    callback_url: faker.phone.phoneNumber()
  })
}

export const makeCheckTransactionStatusParams = () => {
  return faker.random.uuid()
}

export const makeValidateAccountParams = () => {
  return faker.random.uuid()
}
