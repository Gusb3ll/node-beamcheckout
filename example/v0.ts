import { BeamCheckoutV0 } from "../src";

const main = async () => {
  const beam = new BeamCheckoutV0("[YOUR_MERCHANT_ID]", "[YOUR_API_KEY]");

  const paymentInfo = await beam.createPayment({
    order: {
      netAmount: 100,
      totalAmount: 100,
      merchantReferenceId: "ORDER-001",
    },
    supportedPaymentMethods: ["creditCard", "qrThb"],
    redirectUrl: "https://github.com/gusb3ll",
  });

  console.log(paymentInfo);
};

main();
