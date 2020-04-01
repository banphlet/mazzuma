'use strict'

import nock from 'nock'

const baseNock = nock('https://client.teamcyst.com')

export const mockSuccessFulMobileMoneyPayment = ({ apiKey, payload }) => {
  return baseNock
    .post('/api_call.php', {
      ...payload,
      apikey: apiKey
    })
    .reply(200, { code: 1, status: 'success', id: 'XXXXX' })
}

export const mockSuccessfulSendTokens = ({ payload, apiKey }) => {
  return baseNock
    .post('/phase3/mazexchange-api.php', {
      ...payload,
      apikey: apiKey
    })
    .reply(200, { code: 200, id: 'XXXXX', status: 'Successful' })
}

export const mockSuccessfulReceiveToken = ({ payload, apiKey }) => {
  return baseNock
    .post('/phase3/mazexchange-api.php', {
      ...payload,
      apikey: apiKey
    })
    .reply(200, { code: 200, id: 'XXXXX', status: 'Successful' })
}

export const mockSuccessfulCheckTransactionStatus = hash => {
  return baseNock
    .get('/checktransaction.php')
    .query({ hash })
    .reply(200, {
      code: 200,
      hash: 'd6c002acf0425f3aa5bf6f44543bb99cd137474b',
      status: 'Successful'
    })
}

export const mockSuccessfulCheckAccountBalance = apiKey => {
  return baseNock
    .post('/phase3/mazexchange-api.php', {
      apikey: apiKey,
      option: 'get_balance'
    })
    .reply(200, {
      code: 200,
      hash: 'd6c002acf0425f3aa5bf6f44543bb99cd137474b',
      status: 'Successful'
    })
}

export const mockSuccessfulValidateAccount = ({ username, apiKey }) => {
  return baseNock
    .post('/phase3/mazexchange-api.php', {
      apikey: apiKey,
      username,
      option: 'validate_account'
    })
    .reply(200, {
      code: 1,
      status: 'success',
      username: 'stark',
      message: 'Account is valid'
    })
}
