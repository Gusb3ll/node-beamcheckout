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
  
  async createPayment(args: CreatePaymentArgs): Promise<CreatePaymentResponse> {
    const { data } = await axios.post<CreatePaymentResponse>(
      `https://partner-api.beamdata.co/purchases/${this.merchantId}`,
      args,
      { auth: { username: this.merchantId, password: this.apiKey } }
    )

    return data
  }

  async getPayment(purchaseId: string): Promise<GetPaymentResponse> {
    const { data } = await axios.get<GetPaymentResponse>(
      `https://partner-api.beamdata.co/purchases/${this.merchantId}/${purchaseId}/detail`,
      { auth: { username: this.merchantId, password: this.apiKey } },
    )

    return data
  }

  async disablePayment(purchaseId: string): Promise<DisablePaymentResponse> { 
    const { data } = await axios.post<DisablePaymentResponse>(
      `https://partner-api.beamdata.co/purchases/${this.merchantId}/${purchaseId}/disable`,
      { auth: { username: this.merchantId, password: this.apiKey } },
    )

    return data
  }

  //TODO Refunds
}