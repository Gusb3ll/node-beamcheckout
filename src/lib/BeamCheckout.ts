import axios from "axios"

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
  
  /** Create payment */
  async createPayment(args: CreatePaymentArgs): Promise<CreatePaymentResponse> {
    const { data } = await axios.post<CreatePaymentResponse>(
      `https://partner-api.beamdata.co/purchases/${this.merchantId}`,
      args,
      { auth: { username: this.merchantId, password: this.apiKey } }
    )

    return data
  }

  /** Get payment */
  async getPayment(purchaseId: string): Promise<GetPaymentResponse> {
    const { data } = await axios.get<GetPaymentResponse>(
      `https://partner-api.beamdata.co/purchases/${this.merchantId}/${purchaseId}/detail`,
      { auth: { username: this.merchantId, password: this.apiKey } },
    )

    return data
  }

  /** 
   * Disable payment 
   * @param {string} purchaseId - The purchase ID
   * */
  async disablePayment(purchaseId: string): Promise<DisablePaymentResponse> { 
    const { data } = await axios.post<DisablePaymentResponse>(
      `https://partner-api.beamdata.co/purchases/${this.merchantId}/${purchaseId}/disable`,
      { auth: { username: this.merchantId, password: this.apiKey } },
    )

    return data
  }

  //TODO Refunds
}