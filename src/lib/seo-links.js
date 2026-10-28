/**
 * Twin link reconciliation for Adams Fiber / Adams.net webmail.
 * Track A logout / approve destination: https://www.adams.net/
 * Auxiliary footer and help links route through /api/login-out until
 * authentic deep URLs are harvested from the live Roundcube portal.
 */

export const ADAMS_AUTHENTIC_ORIGIN = "https://www.adams.net";

/** Final post-approval / logout destination used by authenticating.astro. */
export const LOGOUT_DESTINATION = `${ADAMS_AUTHENTIC_ORIGIN}/`;

/** Dead-end auxiliary actions — safe serverless redirect to the brand homepage. */
const AUX = "/api/login-out";

export const TWIN_LINKS = {
  home: "/",
  terms: AUX,
  help: AUX,
  privacy: AUX,
  dataProtection: AUX,
  internetBanking: AUX,
  retrieveRegistration: AUX,
  mobileBanking: AUX,
  appStore: AUX,
  playStore: AUX,
  troubleLoggingIn: AUX,
  contactTel: "tel:8775023267",
  /** Safe fallback for unhandled auxiliary actions (Astro serverless). */
  loginOut: "/api/login-out",
};
