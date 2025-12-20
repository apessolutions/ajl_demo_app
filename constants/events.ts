export const SCREEN_NAMES = {
  HOME: "Home",
  SIGNUP_PERSONAL_INFO: "Signup - Personal Information",
  SIGNUP_CREATE_ACCOUNT: "Signup - Create Account",
  SIGNUP_VERIFICATION: "Signup - Verification",
  SIGNUP_THANK_YOU: "Signup - Thank You",
} as const;

export const HOME_CUSTOM_EVENTS = {
  SIGNUP_BUTTON_CLICKED: "signup_button_click",
  LOGIN_BUTTON_CLICKED: "login_button_click",
} as const;

export const SIGNUP_CUSTOM_EVENTS = {
  SIGNUP_PERSONAL_INFO_BUTTON_CLICK: "signup_flow:personal_info_button_click",
  SIGNUP_CREATE_ACCOUNT_BUTTON_CLICK: "signup_flow:create_account_button_click",
  SIGNUP_VERIFICATION_BUTTON_CLICK: "signup_flow:verification_button_click",
  SIGNUP_THANK_YOU_PAGE_VIEW: "signup_flow:thank_you_page_view",
  SIGNUP_LOGIN_BUTTON_CLICK: "signup_flow:login_button_click",
} as const;

