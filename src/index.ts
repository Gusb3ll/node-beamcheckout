import { BeamCheckout as BeamCheckoutV0 } from "./lib/v0/BeamCheckout";
import { BeamCheckout } from "./lib/v1/BeamCheckout";

export { BeamCheckoutV0 };
export default BeamCheckout;

export * as V0Types from "./lib/v0/types";
export * from "./lib/v1/types";
