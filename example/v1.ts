import { BeamCheckoutV1, V1Types } from "../src";

const main = async () => {
  const beam = new BeamCheckoutV1("[YOUR_MERCHANT_ID]", "[YOUR_API_KEY]");

  const paymentInfo = await beam.createPayment({
    order: {
      netAmount: 10000,
      currency: V1Types.CurrencyCode.THB,
    },
    linkSettings: {
      qrPromptPay: {
        isEnabled: true,
      },
      eWallets: {
        isEnabled: true,
      },
      card: {
        isEnabled: true,
      },
    },
    redirectUrl: "https://github.com/gusb3ll",
    collectPhoneNumber: false,
    collectDeliveryAddress: false,
  });

  console.log(paymentInfo);

  // const paymentDetails = await beam.getPayment("paymentLinkId");
  // console.log(paymentDetails);

  // const disable = await beam.disablePayment("paymentLinkId");
  // console.log(disable);

  // const transactions = await beam.listTransactions();
  // console.log(transactions);

  // const txn = await beam.getSuccessfulTransactions(
  //   "transactionId"
  // );
  // console.log(txn);

  // const charge = await beam.createChargePayment({
  //   amount: 10000,
  //   currency: V1Types.CurrencyCode.THB,
  //   paymentMethod: {
  //     paymentMethodType: V1Types.PaymentMethods.QR_PROMPT_PAY,
  //     qrPromptPay: {},
  //   },
  //   referenceId: "ORDER-002",
  // });
  // console.log(charge);

  // const getCharge = await beam.getChargePayment(
  //   "chargeId"
  // );
  // console.log(getCharge);

  // const bolt = await beam.createBoltConnection("pairingCode");
  // console.log(bolt);

  // const getBolt = await beam.getBoltConnection(
  //   "boltConnectionId"
  // );
  // console.log(getBolt);

  // const deleteBoltConnection = await beam.deleteBoltConnection(
  //   "boltConnectionId"
  // );
  // console.log(deleteBoltConnection);

  // const boltIntent = await beam.createBoltIntent({
  //   amount: 10000,
  //   currency: V1Types.CurrencyCode.THB,
  //   boltConnectionId: "boltConnectionId",
  //   paymentMethod: {
  //     paymentMethodType: V1Types.PaymentMethods.QR_PROMPT_PAY,
  //     qrPromptPay: {},
  //   },
  //   referenceId: "ORDER-003",
  //   expiryDurationInSec: 90,
  // });
  // console.log(boltIntent);

  // const cancelBolt = await beam.cancelBoltIntent(
  //   "boltIntentId"
  // );
  // console.log(cancelBolt);
};

main();
