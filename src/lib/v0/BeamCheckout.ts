import {
  CreatePaymentArgs,
  CreatePaymentResponse,
  DisablePaymentResponse,
  GetPaymentResponse
} from "./types"

export class BeamCheckout {
  constructor(merchantId: string, apiKey: string) { 
    this.merchantId = merchantId
    this.apiKey = apiKey
  }

  private merchantId: string
  private apiKey: string

  private getHeaders() {
    return {
      'Authorization': `Basic ${Buffer.from(`${this.merchantId}:${this.apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  }
  
  /** Create payment */
  async createPayment(args: CreatePaymentArgs): Promise<CreatePaymentResponse> {
    const res = await fetch(`https://api.beamcheckout.com/purchases/${this.merchantId}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(args),
    })

    return await res.json()
  }

  /** Get payment */
  async getPayment(purchaseId: string): Promise<GetPaymentResponse> {
    const res = await fetch(`https://api.beamcheckout.com/purchases/${this.merchantId}/${purchaseId}/detail`, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    return await res.json()
  }

  /** 
   * Disable payment 
   * @param {string} purchaseId - The purchase ID
   * */
  async disablePayment(purchaseId: string): Promise<DisablePaymentResponse> { 
    const res = await fetch(`https://api.beamcheckout.com/purchases/${this.merchantId}/${purchaseId}/disable`, {
      method: 'POST',
      headers: this.getHeaders(),
    })

    return await res.json()
  }

  //TODO Refunds
}
