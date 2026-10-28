/**
 * Entity-grounded FAQ copy for the crawler twin + FAQPage JSON-LD.
 * Answers derive from Adams Fiber public webmail (Roundcube) and Adams.net
 * customer support information.
 */

import { SITE_DISPLAY_NAME } from "./site-config.js";

export const SEO_FAQS = [
  {
    id: "faq-sign-in",
    question: `How do I sign in to ${SITE_DISPLAY_NAME} webmail?`,
    answer:
      `Open the ${SITE_DISPLAY_NAME} sign-in page and enter the full email address and password assigned to your Adams Fiber mailbox. After authentication, Roundcube loads your inbox in the browser. Use a modern browser such as current Chrome, Firefox, Safari, or Microsoft Edge for the full experience.`,
  },
  {
    id: "faq-username",
    question: `What username and password do I use for ${SITE_DISPLAY_NAME} webmail?`,
    answer:
      "Your username is typically your full Adams email address (for example your name on your hosted domain). Your password is the mailbox password Adams Fiber provided when your email account was set up. If you use a third-party email app, the same credentials apply to IMAP or POP where enabled.",
  },
  {
    id: "faq-recovery",
    question: "What if I forgot my webmail password or cannot log in?",
    answer:
      "Contact Adams Fiber 24/7 technical support at 877.502.3267 for password reset assistance. Support staff verify your identity before restoring access. Quincy office hours are Monday through Friday, 8:00 a.m. to 5:00 p.m.; Golden office hours are Monday through Friday, 9:00 a.m. to 4:00 p.m. Do not share your password in email or with unsolicited callers.",
  },
  {
    id: "faq-browser",
    question: `Which browsers work with Roundcube on ${SITE_DISPLAY_NAME} webmail?`,
    answer:
      "Roundcube works best in current versions of Chrome, Firefox, Safari, Edge, and other modern browsers. Very old browsers such as Internet Explorer 6 are not supported for the full webmail interface. Keep your browser updated for security and compatibility.",
  },
  {
    id: "faq-services",
    question: `What can I do after signing in to ${SITE_DISPLAY_NAME} webmail?`,
    answer:
      "After login, Roundcube lets you read and send email, manage folders, search messages, and work with contacts and calendar features available on your account. You can compose new mail, reply, forward, and handle attachments from any supported browser without installing desktop software.",
  },
  {
    id: "faq-support",
    question: `Who do I contact for ${SITE_DISPLAY_NAME} email or webmail support?`,
    answer:
      "For webmail login help, password resets, and email troubleshooting, call Adams Fiber technical support at 877.502.3267 (8775023267), available 24 hours a day, seven days a week. General customer service is available at 217.214.3423 during business hours. Visit the Adams Fiber website or local offices in Quincy or Golden, Illinois for in-person assistance.",
  },
];
