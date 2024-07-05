enum PaymentMethods {
  creditCard = 'creditCard',
  internetBanking = 'internetBanking',
  eWallet = 'eWallet',
  installmentsCc = 'installmentsCc',
  bnpl = 'bnpl',
  qrThb = 'qrThb'
}

export type CreatePaymentArgs = {
  channel?: string
  expiry?: string
  order: {
    currencyCode?: string
    description?: string
    merchantReference?: string
    merchantReferenceId?: string
    netAmount: number
    orderItems?: {
      product: {
        description?: string
        imageUrl?: string
        name: string
        price: string
        sku?: string
      }
      quantity: number
    }[]
    totalAmount: number
    totalDiscount?: number
  }
  redirectUrl?: string
  requiredFieldsFormId?: string
  supportedPaymentMethods?: PaymentMethods[]
}

export type CreatePaymentResponse = {
  purchaseId: string
  paymentLink: string
}

export type GetPaymentResponse = {
  merchantId: string
  paymentId: string
  purchaseId: string
  genericPurchaseId: string
  order: {
    merchantReferenceId: string
    merchantReference: string
    description: string
    currencyCode: string
    totalAmount: number
    totalDiscount: number
    netAmount: number
    orderItems: {
      product: {
        description: string
        imageUrl: string
        name: string
        price: string
        sku: string
      }
      quantity: number
    }[]
  }
  requiredFieldsFormId: string
  merchantBasicInfo: {
    availablePaymentMethods: []
    logoUrl: string
    name: string
  }
  isDisabled: boolean
  paymentLink: string
  redirectUrl: string
  state: string
  timePaid: Date
  created: Date
  lastUpdated: Date
  customer: {
    userId: string
    additionalField0: string,
    additionalField1: string,
    additionalField2: string,
    additionalField3: string,
    additionalField4: string,
    additionalField5: string,
    additionalField6: string,
    additionalField7: string,
    additionalField8: string,
    additionalField9: string,
    billingAddress: {
      city: string
      country: string
      fullStreetAddress: string
      postCode: string
    }
    shippingAddress: {
      city: string
      country: string
      fullStreetAddress: string
      postCode: string
    },
    contactNumber: string
    dateOfBirth: string
    email: string
    facebookName: string
    firstName: string
    instagramName: string
    lastName: string
    lineId: string
    title: string
    twitterId: string
  }
  paymentMethod: string
  channel: string
  originator: {
    id: string
    email: string
  }
  expiry: string
  installmentPeriod: number
  refunds: {
    amount: 0
    created: string
    lastUpdated: string
    status: string
    type: string
  }[]
}

export type DisablePaymentResponse = {
  code: number
  message: string
}