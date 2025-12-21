export const SCREEN_NAMES = {
  HOME: "Home",
  SIGNUP_PERSONAL_INFO: "Signup - Personal Information",
  SIGNUP_CREATE_ACCOUNT: "Signup - Create Account",
  SIGNUP_VERIFICATION: "Signup - Verification",
  SIGNUP_THANK_YOU: "Signup - Thank You",
  CASH_JAMEEL_WELCOME: "Cash Jameel - Welcome",
  CASH_JAMEEL_CASH_FINANCING: "Cash Jameel - Cash Financing",
  CASH_JAMEEL_APPLY: "Cash Jameel - Apply",
  CASH_JAMEEL_CALCULATION: "Cash Jameel - Details",
  CASH_JAMEEL_THANK_YOU: "Cash Jameel - Thank You",
} as const;

export const HOME_CUSTOM_EVENTS = {
  SIGNUP_BUTTON_CLICK: "signup_button_click",
  LOGIN_BUTTON_CLICK: "login_button_click",
  CASH_JAMEEL_BUTTON_CLICK: "cash_jameel_button_click",
} as const;

export const SIGNUP_CUSTOM_EVENTS = {
  SIGNUP_PERSONAL_INFO_BUTTON_CLICK: "signup_flow:personal_info_button_click",
  SIGNUP_CREATE_ACCOUNT_BUTTON_CLICK: "signup_flow:create_account_button_click",
  SIGNUP_VERIFICATION_BUTTON_CLICK: "signup_flow:verification_button_click",
  SIGNUP_THANK_YOU_PAGE_VIEW: "signup_flow:thank_you_page_view",
  SIGNUP_LOGIN_BUTTON_CLICK: "signup_flow:login_button_click",
} as const;

export const CASH_JAMEEL_CUSTOM_EVENTS = {
  CASH_JAMEEL_LETS_GO_BUTTON_CLICK: "cash_jameel_flow:lets_go_button_click",
  CASH_JAMEEL_CASH_FINANCING_NEXT_CLICK: "cash_jameel_flow:cash_financing_next_click",
  CASH_JAMEEL_CALCULATE_BUTTON_CLICK: "cash_jameel_flow:calculate_button_click",
  CASH_JAMEEL_FINANCING_DETAILS_NEXT_CLICK: "cash_jameel_flow:financing_details_next_click",
  CASH_JAMEEL_THANK_YOU_PAGE_VIEW: "cash_jameel_flow:thank_you_page_view",
} as const;

