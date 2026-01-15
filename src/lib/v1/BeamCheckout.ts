import {
  CancelBoltIntentResponse,
  CreateBoltConnectionResponse,
  CreateBoltIntentArgs,
  CreateBoltIntentResponse,
  CreateChargePaymentArgs,
  CreateChargePaymentResponse,
  CreatePaymentArgs,
  CreatePaymentResponse,
  DeleteBoltConnectionResponse,
  DisablePaymentResponse,
  GetBoltConnectionResponse,
  GetChargePaymentResponse,
  GetPaymentResponse,
  GetRefundResponse,
  ListTransactionsResponse,
  RefundPaymentResponse,
  SuccessfulTransactionsResponse,
} from "./types";

export class BeamCheckoutV1 {
  constructor(merchantId: string, apiKey: string, sandbox: boolean = false) {
    this.merchantId = merchantId;
    this.apiKey = apiKey;
    this.sandbox = sandbox;
    this.baseUrl = sandbox
      ? "https://playground.api.beamcheckout.com/api/v1"
      : "https://api.beamcheckout.com/api/v1";
  }

  private merchantId: string;
  private apiKey: string;
  private baseUrl: string;
  private sandbox: boolean;

  private getHeaders() {
    return {
      Authorization: `Basic ${Buffer.from(
        `${this.merchantId}:${this.apiKey}`
      ).toString("base64")}`,
      "Content-Type": "application/json",
    };
  }

  /** Create payment
   * @param {CreatePaymentArgs} args - The payment creation arguments
   * @returns {Promise<CreatePaymentResponse>} - The created payment response
   */
  async createPayment(args: CreatePaymentArgs): Promise<CreatePaymentResponse> {
    console.log(`${this.baseUrl}/payment-links`, JSON.stringify(args));
    const res = await fetch(`${this.baseUrl}/payment-links`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(args),
    });

    return await res.json();
  }

  /** Get payment link
   * @param {string} paymentLinkId - The payment link ID
   * @returns {Promise<GetPaymentResponse>} - The payment link details
   */
  async getPayment(paymentLinkId: string): Promise<GetPaymentResponse> {
    const res = await fetch(`${this.baseUrl}/payment-links/${paymentLinkId}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return await res.json();
  }

  /**
   * Disable payment link
   * @param {string} paymentLinkId - The payment link ID
   * @returns {Promise<DisablePaymentResponse>} - The payment link disabled
   * */
  async disablePayment(paymentLinkId: string): Promise<DisablePaymentResponse> {
    const res = await fetch(
      `${this.baseUrl}/payment-links/${paymentLinkId}/disable`,
      {
        method: "PATCH",
        headers: this.getHeaders(),
      }
    );

    return await res.json();
  }

  /**
   * Refund payment
   * @param {string} chargeId - The charge ID
   * @param {number} amount - The amount to refund
   * @param {string} reason - The reason for the refund
   * @returns {Promise<RefundPaymentResponse>} - The refund details
   */
  async refundPayment(
    chargeId: string,
    amount?: number,
    reason?: string
  ): Promise<RefundPaymentResponse> {
    const res = await fetch(`${this.baseUrl}/refunds`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        amount: amount,
        chargeId: chargeId,
        reason: reason,
      }),
    });

    return await res.json();
  }

  /**
   * Get refund details
   * @param {string} refundId - The refund ID
   * @returns {Promise<GetRefundResponse>} - The refund details
   */
  async getRefund(refundId: string): Promise<GetRefundResponse> {
    const res = await fetch(`${this.baseUrl}/refunds/${refundId}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return await res.json();
  }

  /**
   * List transactions
   * @param {string} referenceId - The merchant reference ID to filter transactions
   * @param {number} limit - The number of transactions to retrieve (default: 10)
   * @param {number} offset - The offset for pagination
   * @returns {Promise<ListTransactionsResponse>} - The list of transactions
   * */
  async listTransactions(
    referenceId?: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<ListTransactionsResponse> {
    const res = await fetch(
      `${this.baseUrl}/transactions?limit=${limit}&offset=${offset}&referenceId=${referenceId}`,
      {
        method: "GET",
        headers: this.getHeaders(),
      }
    );

    return await res.json();
  }

  /**
   * Get successful transactions by transaction ID
   * @param {string} transactionId - The transaction ID P.S. using the same ID i.e. prefixed with ch_ or re_
   * @returns {Promise<SuccessfulTransactionsResponse>} - The successful transactions details
   */
  async getSuccessfulTransactions(
    transactionId: string
  ): Promise<SuccessfulTransactionsResponse> {
    const res = await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return await res.json();
  }

  /**
   * Create charge payment
   * @param {CreateChargePaymentArgs} args - The charge payment creation arguments
   * @returns {Promise<CreateChargePaymentResponse>} - The created charge payment response
   */
  async createChargePayment(
    args: CreateChargePaymentArgs
  ): Promise<CreateChargePaymentResponse> {
    const res = await fetch(`${this.baseUrl}/charges`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(args),
    });

    return await res.json();
  }

  /**
   * Get charge payment details
   * @param {chargeId} string - The charge ID
   * @returns {Promise<GetChargePaymentResponse>} - The charge payment details
   */
  async getChargePayment(chargeId: string): Promise<GetChargePaymentResponse> {
    const res = await fetch(`${this.baseUrl}/charges/${chargeId}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return await res.json();
  }

  /**
   * Create bolt connection
   * @param {pairingCode} string - The pairing code
   * @returns {Promise<CreateBoltConnectionResponse>} - Created bolt connection response
   */
  async createBoltConnection(
    pairingCode: string
  ): Promise<CreateBoltConnectionResponse> {
    const res = await fetch(`${this.baseUrl}/bolt-connections`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        pairingCode: pairingCode,
      }),
    });

    return await res.json();
  }

  /**
   * Delete bolt connection
   * @param { boltConnectionId } string - The bolt connection ID
   * @returns { Promise<DeleteBoltConnectionResponse> } - The deleted bolt connection response
   */
  async deleteBoltConnection(
    boltConnectionId: string
  ): Promise<DeleteBoltConnectionResponse> {
    const res = await fetch(
      `${this.baseUrl}/bolt-connections/${boltConnectionId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    );

    return await res.json();
  }

  /**
   * Get bolt connection
   * @param { boltConnectionId } string - The bolt connection ID
   * @returns { Promise<GetBoltConnectionResponse> } - Get bolt connection response
   */
  async getBoltConnection(
    boltConnectionId: string
  ): Promise<GetBoltConnectionResponse> {
    const res = await fetch(
      `${this.baseUrl}/bolt-connections/${boltConnectionId}`,
      {
        method: "GET",
        headers: this.getHeaders(),
      }
    );

    return await res.json();
  }

  /**
   * Create Bolt Intent
   * @param {CreateBoltIntentArgs} args - The bolt payment creation arguments
   * @returns {Promise<CreateBoltIntentResponse>} - Created bolt payment response
   */
  async createBoltIntent(
    args: CreateBoltIntentArgs
  ): Promise<CreateBoltIntentResponse> {
    const res = await fetch(`${this.baseUrl}/bolt-intents`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(args),
    });

    return await res.json();
  }

  /**
   * Cancel Bolt Intent
   * @param {string} boltIntentId - The bolt intent ID
   * @returns {Promise<CancelBoltIntentResponse>} - Cancelled bolt intent response
   */
  async cancelBoltIntent(
    boltIntentId: string
  ): Promise<CancelBoltIntentResponse> {
    const res = await fetch(
      `${this.baseUrl}/bolt-intents/${boltIntentId}/cancel`,
      {
        method: "PATCH",
        headers: this.getHeaders(),
      }
    );

    return await res.json();
  }
}
