'use strict'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mazzumaClient from '../../src'
import * as fixtures from './fixture'
import * as mocks from './mocks'
describe('Mazzuma client Wrapper', () => {
  const apiKey = '983444'
  const client = mazzumaClient(apiKey)

  before(() => {
    chai.use(chaiAsPromised)
  })

  it('should throw error if apiKey is not passed', () => {
    return chai.expect(mazzumaClient).to.throw('apiKey is required')
  })

  describe('mobileMoneyPayment()', () => {
    const payload = fixtures.makeSendMobileMoneyParams()
    let scope
    before(() => {
      scope = mocks.mockSuccessFulMobileMoneyPayment({ apiKey, payload })
    })

    const requiredParams = [
      'price',
      'network',
      'recipient_number',
      'sender',
      'option'
    ]
    requiredParams.forEach(param => {
      it(`should throw error if ${param} is not passed`, () => {
        const paramsCopy = { ...payload }
        delete paramsCopy[param]
        chai
          .expect(() => client.mobileMoneyPayment(paramsCopy))
          .to.throw(`${param} is required`)
      })
    })

    it('should make successful request to mazzuma', async () => {
      await client.mobileMoneyPayment(payload)
      chai.expect(scope.isDone()).to.equal(true)
    })
  })

  describe('sendTokens()', () => {
    const payload = fixtures.makeSendTokensParams()
    let scope
    before(() => {
      scope = mocks.mockSuccessfulSendTokens({ apiKey, payload })
    })

    const requiredParams = ['price', 'sender', 'recipient']
    requiredParams.forEach(param => {
      it(`should throw error if ${param} is not passed`, () => {
        const paramsCopy = { ...payload }
        delete paramsCopy[param]
        chai
          .expect(() => client.sendTokens(paramsCopy))
          .to.throw(`${param} is required`)
      })
    })

    it('should make successful ', async () => {
      await client.sendTokens(payload)
      chai.expect(scope.isDone()).to.equal(true)
    })
  })

  describe('receiveTokens()', () => {
    const payload = fixtures.makeReceiveTokensParams()
    let scope
    before(() => {
      scope = mocks.mockSuccessfulReceiveToken({ apiKey, payload })
    })

    const requiredParams = ['option', 'sender', 'callback_url']
    requiredParams.forEach(param => {
      it(`should throw error if ${param} is not passed`, () => {
        const paramsCopy = { ...payload }
        delete paramsCopy[param]
        chai
          .expect(() => client.receiveTokens(paramsCopy))
          .to.throw(`${param} is required`)
      })
    })

    it('should make successful ', async () => {
      await client.receiveTokens(payload)
      chai.expect(scope.isDone()).to.equal(true)
    })
  })

  describe('checkTransactionStatus()', () => {
    const hash = fixtures.makeCheckTransactionStatusParams()
    let scope
    before(() => {
      scope = mocks.mockSuccessfulCheckTransactionStatus(hash)
    })
    it(`should throw error if hash is not passed`, () => {
      chai.expect(client.checkTransactionStatus).to.throw(`hash is required`)
    })

    it('should make successful ', async () => {
      await client.checkTransactionStatus(hash)
      chai.expect(scope.isDone()).to.equal(true)
    })
  })

  describe('checkAccountBalance()', () => {
    let scope
    before(() => {
      scope = mocks.mockSuccessfulCheckAccountBalance(apiKey)
    })

    it('should make successful ', async () => {
      await client.checkAccountBalance()
      chai.expect(scope.isDone()).to.equal(true)
    })
  })

  describe('validateAccount()', () => {
    const username = fixtures.makeValidateAccountParams()
    let scope
    before(() => {
      scope = mocks.mockSuccessfulValidateAccount({ username, apiKey })
    })
    it(`should throw error if hash is not passed`, () => {
      chai.expect(client.checkTransactionStatus).to.throw(`hash is required`)
    })

    it('should make successful ', async () => {
      await client.validateAccount(username)
      chai.expect(scope.isDone()).to.equal(true)
    })
  })
})
