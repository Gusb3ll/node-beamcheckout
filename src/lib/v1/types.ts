export enum PaymentMethods {
  CARD = "CARD",
  CARD_INSTALLMENTS = "CARD_INSTALLMENTS",
  CARD_TOKEN = "CARD_TOKEN",
  CARD_TOKEN_INSTALLMENTS = "CARD_TOKEN_INSTALLMENTS",
  QR_PROMPT_PAY = "QR_PROMPT_PAY",
  ALIPAY = "ALIPAY",
  LINE_PAY = "LINE_PAY",
  MOBILE_BANKING = "MOBILE_BANKING",
  SHOPEE_PAY = "SHOPEE_PAY",
  TRUE_MONEY = "TRUE_MONEY",
  WECHAT_PAY = "WECHAT_PAY",
  BANGKOK_BANK_APP = "BANGKOK_BANK_APP",
  KPLUS = "KPLUS",
  KRUNGSRI_APP = "KRUNGSRI_APP",
  SCB_EASY = "SCB_EASY",
}

export enum BeamFeeType {
  TRANSACTION_FEE = "TRANSACTION_FEE",
  SERVICE_FEE = "SERVICE_FEE",
}

export enum BeamPaymentLinkStatus {
  ACTIVE = "ACTIVE",
  PAID = "PAID",
  EXPIRED = "EXPIRED",
  DISABLED = "DISABLED",
  VOIDED = "VOIDED",
  REFUNDED = "REFUNDED",
}

export enum CurrencyCode {
  THB = "THB",
}

export type CreatePaymentArgs = {
  collectDeliveryAddress?: boolean;
  collectPhoneNumber?: boolean; // default: true
  expiresAt?: string;
  feeType?: BeamFeeType;
  linkSettings: {
    buyNowPayLater?: { isEnabled?: boolean };
    card?: { isEnabled?: boolean };
    cardInstallments?: {
      installments3m?: { isEnabled?: boolean };
      installments4m?: { isEnabled?: boolean };
      installments6m?: { isEnabled?: boolean };
      installments10m?: { isEnabled?: boolean };
      isEnabled?: boolean;
    };
    eWallets?: { isEnabled?: boolean };
    mobileBanking?: { isEnabled?: boolean };
    qrPromptPay?: { isEnabled?: boolean };
  };
  order: {
    currency: CurrencyCode;
    description?: string;
    internalNote?: string;
    netAmount: number;
    orderItems?: {
      description?: string;
      imageUrl?: string;
      itemName?: string;
      price: number;
      productId?: string;
      quantity?: number;
      sku?: string;
    }[];
    referenceId?: string;
  };
  redirectUrl?: string;
};

export type CreatePaymentResponse = {
  id: string;
  url: string;
};

export type GetPaymentResponse = {
  collectDeliveryAddress: boolean;
  collectPhoneNumber: boolean;
  expiresAt: string;
  feeType: BeamFeeType;
  linkSettings: {
    buyNowPayLater: { isEnabled: boolean };
    card: { isEnabled: boolean };
    cardInstallments: {
      installments3m: { isEnabled: boolean };
      installments4m: { isEnabled: boolean };
      installments6m: { isEnabled: boolean };
      installments10m: { isEnabled: boolean };
      isEnabled: boolean;
    };
    eWallets: { isEnabled: boolean };
    mobileBanking: { isEnabled: boolean };
    qrPromptPay: { isEnabled: boolean };
  };
  merchantId: string;
  order: {
    currency: CurrencyCode;
    description: string;
    internalNote: string;
    netAmount: number;
    orderItems: {
      description: string;
      imageUrl: string;
      itemName: string;
      price: number;
      productId: string;
      quantity: number;
      sku: string;
    }[];
    referenceId: string;
  };
  paymentLinkId: string;
  redirectUrl: string;
  status: BeamPaymentLinkStatus;
  url: string;
};

export type DisablePaymentResponse = {
  code: number;
  error?: { errorCode: string; errorMessage: string };
  message: string;
};

export enum BeamRefundStatus {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  DISABLED = "DISABLED",
  VOIDED = "VOIDED",
  REFUNDED = "REFUNDED",
}

export type RefundPaymentResponse = {
  refundId: string;
};

export type GetRefundResponse = {
  amount: number;
  chargeId: string;
  createdAt: string;
  currency: CurrencyCode;
  failureCode: string;
  merchantId: string;
  referenceId: string;
  refundId: string;
  refundReason: string;
  status: BeamRefundStatus;
  transactionTime: string;
  updatedAt: string;
};

export enum ChargeSource {
  PAYMENT_LINK = "PAYMENT_LINK",
  STORE_LINK = "STORE_LINK",
  QR_PROMPT_PAY_LINK = "QR_PROMPT_PAY_LINK",
  API = "API",
  BOLT = "BOLT",
}

export enum feeStrategy {
  RATE = "RATE",
  MINIMUM_AMOUNT = "MINIMUM_AMOUNT",
}

export enum BeamTransactionsType {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  DISABLED = "DISABLED",
  VOIDED = "VOIDED",
  REFUNDED = "REFUNDED",
}

export type ListTransactionsResponse = {
  data: {
    chargeSource: ChargeSource;
    createdAt: string;
    currency: CurrencyCode;
    feeAmount: number;
    feeStrategy: feeStrategy;
    grossAmount: number;
    merchantId: string;
    netAmount: number;
    referenceId: string;
    sourceId: string;
    transactionId: string;
    transactionTime: string;
    transactionType: BeamTransactionsType;
    vatAmount: number;
  }[];
  totalCount: number;
};

export type SuccessfulTransactionsResponse = {
  chargeSource: ChargeSource;
  createdAt: string;
  currency: CurrencyCode;
  feeAmount: number;
  feeStrategy: feeStrategy;
  grossAmount: number;
  merchantId: string;
  netAmount: number;
  referenceId: string;
  sourceId: string;
  transactionId: string;
  transactionTime: string;
  transactionType: BeamTransactionsType;
  vatAmount: number;
};

export type CreateChargePaymentArgs = {
  amount: number;
  currency: CurrencyCode;
  customer?: {
    deliveryAddress?: {
      address?: {
        city?: string;
        country?: string;
        postCode?: string;
        streetAddress?: string;
      };
      contactName?: string;
      phone?: {
        countryCode: string;
        number: string;
      };
    };
    email?: string;
    primaryPhoneNumber?: {
      countryCode: string;
      number: string;
    };
  };
  paymentMethod: {
    alipay?: {};
    bangkokBankApp?: {};
    card?: {
      cardHolderName: string;
      expiryMonth: number;
      expiryYear: number;
      pan: string;
      securityCode?: string;
    };
    cardInstallments?: {
      cardHolderName: string;
      expiryMonth: number;
      expiryYear: number;
      installmentPeriod: 3 | 4 | 6 | 10;
      pan: string;
      securityCode?: string;
    };
    cardToken?: {
      cardTokenId: string;
      securityCode: string;
    };
    cardTokenInstallments?: {
      cardTokenId: string;
      installmentPeriod: 3 | 4 | 6 | 10;
      securityCode: string;
    };
    kPlus?: {};
    krungsriApp?: {};
    linePay?: {};
    paymentMethodType: PaymentMethods;
    qrPromptPay?: {
      expiresAt?: string;
    };
    scbEasy?: {};
    shopeePay?: {};
    trueMoney?: {};
    weChatPay?: {};
  };
  referenceId?: string;
  returnUrl?: string;
  skip3dsFlow?: boolean;
};

export enum ActionRequired {
  NONE = "NONE",
  REDIRECT = "REDIRECT",
  "ENCODE_IMAGE" = "ENCODE_IMAGE",
}

export type CreateChargePaymentResponse = {
  actionRequired: ActionRequired;
  chargeId: string;
  encodedImage?: {
    expiry: string;
    imageBase64Encoded: string;
    rawData: string;
  };
  paymentMethodType: PaymentMethods;
  redirect?: {
    redirectUrl: string;
  };
};

export enum FailureCode {
  CH_PROCESSING_FAILED = "CH_PROCESSING_FAILED",
  CH_INSUFFICIENT_FUNDS = "CH_INSUFFICIENT_FUNDS",
  CH_AUTHENTICATION_FAILED = "CH_AUTHENTICATION_FAILED",
}

export enum BeamChargeStatus {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export type GetChargePaymentResponse = {
  amount: number;
  chargeId: string;
  createdAt: string;
  currency: CurrencyCode;
  customer?: {
    deliveryAddress: {
      address: {
        city: string;
        country: string;
        postCode: string;
        streetAddress: string;
      };
      contactName: string;
      phone: {
        countryCode: string;
        number: string;
      };
    };
    email: string;
    primaryPhone: {
      countryCode: string;
      number: string;
    };
  };
  failureCode: FailureCode;
  merchantId: string;
  paymentMethod: {
    alipay?: {};
    bangkokBankApp?: {};
    card?: {
      brand: string;
      countryAlpha2: string;
      last4: string;
    };
    cardInstallments?: {
      brand: string;
      countryAlpha2: string;
      installmentPeriod: 3 | 4 | 6 | 10;
      last4: string;
    };
    kPlus?: {};
    krungsriApp?: {};
    krungthaiNext?: {};
    linePay?: {};
    make?: {};
    paymentMethodType: PaymentMethods;
    qrPromptPay?: {};
    scbEasy?: {};
    shopeePay?: {};
    trueMoney?: {};
    weChatPay?: {};
  };
  referenceId: string;
  source: ChargeSource;
  sourceId: string;
  status: BeamChargeStatus;
  transactionTime: string;
  updatedAt: string;
};

export type CreateBoltConnectionResponse = {
  createdAt: string;
  deviceId: string;
  id: string;
  merchantId: string;
};

export type DeleteBoltConnectionResponse = {
  code: number;
  message: string;
  error?: { errorCode: string; errorMessage: string };
};

export type GetBoltConnectionResponse = {
  createdAt: string;
  deviceId: string;
  id: string;
  merchantId: string;
};

export enum BoltIssuerGroup {
  BangkokBank = "BangkokBank",
  CIMBThaiBank = "CIMBThaiBank",
  KasikornBank = "KasikornBank",
  KrungsriBank = "KrungsriBank",
  KrungsriFirstChoice = "KrungsriFirstChoice",
  KrungthaiBank = "KrungthaiBank",
  SiamCommercialBank = "SiamCommercialBank",
  TMBThanachartBank = "TMBThanachartBank",
  UnitedOverseasBank = "UnitedOverseasBank",
  Ungrouped = "Ungrouped",
  Unknown = "Unknown",
}

export enum BoltStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
}

export type CreateBoltIntentArgs = {
  amount: number;
  boltConnectionId?: string;
  currency: CurrencyCode;
  expiryDurationInSec: number;
  internalNote?: string;
  paymentMethod: {
    alipay?: {};
    card?: {};
    cardInstallments?: {
      installmentPeriod: 3 | 4 | 6 | 10;
      issuerGroup: BoltIssuerGroup;
    };
    linePay?: {};
    paymentMethodType: PaymentMethods;
    qrPromptPay?: {};
    shopeePay?: {};
    trueMoney?: {};
    weChatPay?: {};
  };
  referenceId: string;
};

export type CreateBoltIntentResponse = {
  amount: number;
  boltConnectionId: string;
  createdAt: string;
  createdBy: string;
  currency: CurrencyCode;
  expiresAt: string;
  id: string;
  internalNote: string;
  merchant: {
    logoUrl: string;
    merchantId: string;
    name: string;
  };
  paymentMethod: {
    alipay: {};
    card: {};
    cardInstallments: {
      installmentPeriod: 3 | 4 | 6 | 10;
      issuerGroup: BoltIssuerGroup;
    };
    linePay: {};
    paymentMethodType: PaymentMethods;
    qrPromptPay: {};
    shopeePay: {};
    trueMoney: {};
    weChatPay: {};
  };
  referenceId: string;
  status: BoltStatus;
  updatedAt: string;
  updatedBy: string;
};

export type CancelBoltIntentResponse = {
  code: number;
  error?: {
    errorCode: string;
    errorMessage: string;
  };
  message: string;
};
