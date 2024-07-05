# node-beamcheckout

Package for [Beam Checkout](https://beamcheckout.com)

## Installation

```bash
pnpm add node-beamcheckout
```

## Example

```typescript
import { BeamCheckout } from 'node-beamcheckout'

const beam = new BeamCheckout("[YOUR_MERCHANT_ID]", "[YOUR_API_KEY]")

const paymentInfo = await beam.createPayment({
  order: {
    netAmount: 100,
    totalAmount: 100,
    merchantReferenceId: 'ORDER-001'
  },
  redirectUrl: 'https://github.com/gusb3ll'
})

console.log(paymentInfo)
```
