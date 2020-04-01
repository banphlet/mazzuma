'use strict'
import axios from 'axios'
import { required } from './utils'
import {
  MobileMoneyPaymentParameters,
  MobileMoneyPaymentResponse,
  SendTokensParameters,
  SendTokensResponse,
  ReceiveTokensResponse,
  ReceiveTokensParameters,
  CheckTransactionStatusResponse,
  CheckAccountBalanceResponse,
  ValidateAccountResponse
} from './interfaces'

const client = axios.create({
  baseURL: 'https://client.teamcyst.com'
})

/**
 *
 * Mazzuma client library
 * @param {String} apiKey The API key generated when you created the Mazzuma Business account. This can be accessed or changed via the web dashboard.
 */
function mazzumaLib (apiKey: string = required('apiKey')) {
  return {
    /**
     *
     * Making a mobile money payment request
     */
    mobileMoneyPayment ({
      price = required('price'),
      network = required('network'),
      recipient_number = required('recipient_number'),
      sender = required('sender'),
      option = required('option'),
      orderID,
      token
    }: MobileMoneyPaymentParameters): Promise<MobileMoneyPaymentResponse> {
      return client
        .post('/api_call.php', {
          price,
          network,
          recipient_number,
          sender,
          orderID,
          token,
          option,
          apikey: apiKey
        })
        .then(({ data }) => data)
    },
    /**
     *
     * Send Mazzuma Tokens
     */
    sendTokens ({
      price = required('price'),
      recipient = required('recipient'),
      sender = required('sender')
    }: SendTokensParameters): Promise<SendTokensResponse> {
      return client
        .post('/phase3/mazexchange-api.php', {
          price,
          recipient,
          sender,
          apikey: apiKey
        })
        .then(({ data }) => data)
    },
    /**
     * When receiving MAZ tokens, a notification will be sent to the callbackURL that you set using this API.
     */
    receiveTokens ({
      option = required('option'),
      sender = required('sender'),
      callback_url = required('callback_url')
    }: ReceiveTokensParameters): Promise<ReceiveTokensResponse> {
      return client
        .post('/phase3/mazexchange-api.php', {
          option,
          sender,
          callback_url,
          apikey: apiKey
        })
        .then(({ data }) => data)
    },
    /**
     *
     *Checking Transaction Status
     @param {String} hash Transaction hash
     */
    checkTransactionStatus (
      hash: string = required('hash')
    ): Promise<CheckTransactionStatusResponse> {
      return client
        .get('/checktransaction.php', {
          params: {
            hash
          }
        })
        .then(({ data }) => data)
    },
    /**
     * Get Account Balance
     */
    checkAccountBalance (): Promise<CheckAccountBalanceResponse> {
      return client
        .post('/phase3/mazexchange-api.php', {
          apikey: apiKey,
          option: 'get_balance'
        })
        .then(({ data }) => data)
    },
    /**
     * Validate Account
     * @param {String} username The account username you wish to validate
     */
    validateAccount (
      username: string = required('username')
    ): Promise<ValidateAccountResponse> {
      return client
        .post('/phase3/mazexchange-api.php', {
          apikey: apiKey,
          option: 'validate_account',
          username
        })
        .then(({ data }) => data)
    }
  }
}

export default mazzumaLib
