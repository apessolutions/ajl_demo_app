# PostHog Analytics Integration - Technical Documentation

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Configuration](#configuration)
3. [Screen Flows & Events](#screen-flows--events)
   - [Home Screen Flow](#home-screen-flow)
   - [Signup Flow](#signup-flow)
   - [Cash Jameel Flow](#cash-jameel-flow)
4. [Event Reference](#event-reference)
5. [Implementation Details](#implementation-details)

---

## Initial Setup

### Installation

1. **Install PostHog React Native SDK**
   ```bash
   npm install posthog-react-native
   # or
   yarn add posthog-react-native
   ```

2. **Package Version**
   - Current version: `posthog-react-native@^4.16.2`

### Configuration

The PostHog provider is configured in the root layout file (`app/_layout.tsx`):

```typescript
import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";

export default function RootLayout() {
  return (
    <PostHogProvider 
      apiKey="phc_lw7avLE9sYgTmocLLe0kpfsUobxSeFyAqDym62Mayah"
      autocapture={true}
      options={{
        host: "https://posthogv2.apessolutionsdev.com",
      }}
    >
      <Stack />
    </PostHogProvider>
  );
}
```

### Configuration Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `apiKey` | `phc_lw7avLE9sYgTmocLLe0kpfsUobxSeFyAqDym62Mayah` | PostHog project API key |
| `autocapture` | `true` | Enables automatic event capture for user interactions |
| `host` | `https://posthogv2.apessolutionsdev.com` | Custom PostHog instance host URL |

### Usage in Components

To use PostHog in any component:

```typescript
import { usePostHog } from 'posthog-react-native';

const MyComponent = () => {
  const posthog = usePostHog();
  
  // Track screen view
  useEffect(() => {
    posthog.screen('Screen Name');
  }, []);
  
  // Track custom event
  const handleAction = () => {
    posthog.capture('event_name');
  };
};
```

---

## Screen Flows & Events

### Home Screen Flow

#### Screen: Home
- **Screen Name**: `Home`
- **Route**: `/`
- **File**: `app/index.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Home Screen - showing Sign Up, Login, and Cash Jameel buttons]
```

**Events Tracked:**
- **Screen View**: Automatically tracked when screen loads
  - Event: `$screen` with screen name `"Home"`

- **Custom Events**:
  - `signup_button_click` - Triggered when user clicks "Sign Up" button
  - `login_button_click` - Triggered when user clicks "Login" button
  - `cash_jameel_button_click` - Triggered when user clicks "Cash Jameel" button

**Navigation Flow:**
- Sign Up → `/signup/personal-info`
- Login → (No navigation, event only)
- Cash Jameel → `/cash-jameel/welcome`

---

### Signup Flow

#### Screen 1: Personal Information
- **Screen Name**: `Signup - Personal Information`
- **Route**: `/signup/personal-info`
- **File**: `app/signup/personal-info.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Personal Information Screen - showing form fields and Next button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Signup - Personal Information"`
- **Custom Event**: `signup_flow:personal_info_button_click` - Triggered when "Next" button is clicked

**Navigation Flow:**
- Next → `/signup/create-account`

---

#### Screen 2: Create Account
- **Screen Name**: `Signup - Create Account`
- **Route**: `/signup/create-account`
- **File**: `app/signup/create-account.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Create Account Screen - showing account creation form and Create button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Signup - Create Account"`
- **Custom Event**: `signup_flow:create_account_button_click` - Triggered when "Create" button is clicked

**Navigation Flow:**
- Create → `/signup/verification`

---

#### Screen 3: Verification
- **Screen Name**: `Signup - Verification`
- **Route**: `/signup/verification`
- **File**: `app/signup/verification.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Verification Screen - showing verification code input and Next button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Signup - Verification"`
- **Custom Event**: `signup_flow:verification_button_click` - Triggered when "Next" button is clicked

**Navigation Flow:**
- Next → `/signup/thank-you`

---

#### Screen 4: Thank You
- **Screen Name**: `Signup - Thank You`
- **Route**: `/signup/thank-you`
- **File**: `app/signup/thank-you.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Thank You Screen - showing success message and Sign In button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Signup - Thank You"`
- **Custom Event**: `signup_flow:thank_you_page_view` - Automatically tracked when screen loads
- **Custom Event**: `signup_flow:login_button_click` - Triggered when "Sign In" button is clicked

**Navigation Flow:**
- Sign In → `/` (Home)

**Signup Flow Diagram:**
```
Home → Personal Information → Create Account → Verification → Thank You → Home
```

---

### Cash Jameel Flow

#### Screen 1: Welcome
- **Screen Name**: `Cash Jameel - Welcome`
- **Route**: `/cash-jameel/welcome`
- **File**: `app/cash-jameel/welcome.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Cash Jameel Welcome Screen - showing welcome message and Let's Go button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Cash Jameel - Welcome"`
- **Custom Event**: `cash_jameel_flow:lets_go_button_click` - Triggered when "Let's Go" button is clicked

**Navigation Flow:**
- Let's Go → `/cash-jameel/cash-financing`

---

#### Screen 2: Cash Financing
- **Screen Name**: `Cash Jameel - Cash Financing`
- **Route**: `/cash-jameel/cash-financing`
- **File**: `app/cash-jameel/cash-financing.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Cash Financing Screen - showing financing options and Next button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Cash Jameel - Cash Financing"`
- **Custom Event**: `cash_jameel_flow:cash_financing_next_click` - Triggered when "Next" button is clicked

**Navigation Flow:**
- Next → `/cash-jameel/apply`

---

#### Screen 3: Apply
- **Screen Name**: `Cash Jameel - Apply`
- **Route**: `/cash-jameel/apply`
- **File**: `app/cash-jameel/apply.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Apply Screen - showing application form and Calculate button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Cash Jameel - Apply"`
- **Custom Event**: `cash_jameel_flow:calculate_button_click` - Triggered when "Calculate" button is clicked

**Navigation Flow:**
- Calculate → `/cash-jameel/details`

---

#### Screen 4: Details (Calculation)
- **Screen Name**: `Cash Jameel - Details`
- **Route**: `/cash-jameel/details`
- **File**: `app/cash-jameel/details.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Details Screen - showing financing calculation details and Next button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Cash Jameel - Details"`
- **Custom Event**: `cash_jameel_flow:financing_details_next_click` - Triggered when "Next" button is clicked

**Navigation Flow:**
- Next → `/cash-jameel/thank-you`

---

#### Screen 5: Thank You
- **Screen Name**: `Cash Jameel - Thank You`
- **Route**: `/cash-jameel/thank-you`
- **File**: `app/cash-jameel/thank-you.tsx`

**Screenshot Placeholder:**
```
[SCREENSHOT: Cash Jameel Thank You Screen - showing success message and Home button]
```

**Events Tracked:**
- **Screen View**: `$screen` with screen name `"Cash Jameel - Thank You"`
- **Custom Event**: `cash_jameel_flow:thank_you_page_view` - Automatically tracked when screen loads

**Navigation Flow:**
- Home → `/` (Home)

**Cash Jameel Flow Diagram:**
```
Home → Welcome → Cash Financing → Apply → Details → Thank You → Home
```

---

## Event Reference

### Screen Names

All screen names are defined in `constants/events.ts`:

```typescript
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
```

### Custom Events

#### Home Screen Events
```typescript
export const HOME_CUSTOM_EVENTS = {
  SIGNUP_BUTTON_CLICK: "signup_button_click",
  LOGIN_BUTTON_CLICK: "login_button_click",
  CASH_JAMEEL_BUTTON_CLICK: "cash_jameel_button_click",
} as const;
```

#### Signup Flow Events
```typescript
export const SIGNUP_CUSTOM_EVENTS = {
  SIGNUP_PERSONAL_INFO_BUTTON_CLICK: "signup_flow:personal_info_button_click",
  SIGNUP_CREATE_ACCOUNT_BUTTON_CLICK: "signup_flow:create_account_button_click",
  SIGNUP_VERIFICATION_BUTTON_CLICK: "signup_flow:verification_button_click",
  SIGNUP_THANK_YOU_PAGE_VIEW: "signup_flow:thank_you_page_view",
  SIGNUP_LOGIN_BUTTON_CLICK: "signup_flow:login_button_click",
} as const;
```

#### Cash Jameel Flow Events
```typescript
export const CASH_JAMEEL_CUSTOM_EVENTS = {
  CASH_JAMEEL_LETS_GO_BUTTON_CLICK: "cash_jameel_flow:lets_go_button_click",
  CASH_JAMEEL_CASH_FINANCING_NEXT_CLICK: "cash_jameel_flow:cash_financing_next_click",
  CASH_JAMEEL_CALCULATE_BUTTON_CLICK: "cash_jameel_flow:calculate_button_click",
  CASH_JAMEEL_FINANCING_DETAILS_NEXT_CLICK: "cash_jameel_flow:financing_details_next_click",
  CASH_JAMEEL_THANK_YOU_PAGE_VIEW: "cash_jameel_flow:thank_you_page_view",
} as const;
```

### Event Naming Convention

- **Screen Views**: Use `$screen` event with descriptive screen names
- **Custom Events**: Use lowercase with underscores, prefixed with flow name (e.g., `signup_flow:`, `cash_jameel_flow:`)
- **Button Clicks**: Suffix with `_button_click` or `_click`
- **Page Views**: Suffix with `_page_view`

---

## Implementation Details

### Screen Tracking Pattern

All screens follow this pattern for tracking:

```typescript
import { usePostHog } from 'posthog-react-native';
import { useEffect } from 'react';
import { SCREEN_NAMES } from '@/constants/events';

const MyScreen = () => {
  const posthog = usePostHog();
  
  useEffect(() => {
    posthog.screen(SCREEN_NAMES.SCREEN_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // ... rest of component
};
```

### Custom Event Tracking Pattern

Custom events are tracked on user interactions:

```typescript
import { usePostHog } from 'posthog-react-native';
import { CUSTOM_EVENTS } from '@/constants/events';

const MyComponent = () => {
  const posthog = usePostHog();
  
  const handleAction = () => {
    posthog.capture(CUSTOM_EVENTS.EVENT_NAME);
    // Perform action (navigation, etc.)
  };
};
```

### File Structure

```
app/
├── _layout.tsx                    # PostHog Provider setup
├── index.tsx                      # Home screen
├── signup/
│   ├── personal-info.tsx
│   ├── create-account.tsx
│   ├── verification.tsx
│   └── thank-you.tsx
└── cash-jameel/
    ├── welcome.tsx
    ├── cash-financing.tsx
    ├── apply.tsx
    ├── details.tsx
    └── thank-you.tsx

constants/
└── events.ts                      # All screen names and event constants
```

### Best Practices

1. **Always use constants** from `constants/events.ts` instead of hardcoding event names
2. **Track screen views** in `useEffect` hooks when components mount
3. **Track custom events** before performing actions (navigation, API calls, etc.)
4. **Use descriptive event names** that clearly indicate the action and flow
5. **Maintain consistency** in event naming conventions across the app

### Testing

To verify PostHog events are being tracked:

1. Enable PostHog debug mode (if available in your PostHog instance)
2. Check PostHog dashboard for incoming events
3. Use PostHog's live events view to see real-time event tracking
4. Verify screen views appear as `$screen` events
5. Verify custom events appear with their defined names

### Troubleshooting

**Issue**: Events not appearing in PostHog
- Verify API key is correct
- Check network connectivity to PostHog host
- Ensure PostHogProvider wraps the entire app
- Verify `usePostHog` hook is called within PostHogProvider context

**Issue**: Screen views not tracking
- Ensure `posthog.screen()` is called in `useEffect` hook
- Verify screen name constant is correctly imported
- Check that component is actually mounting

**Issue**: Custom events not tracking
- Verify event name constant is correctly imported
- Ensure `posthog.capture()` is called before navigation/action
- Check that event handler is properly bound to UI element

---

## Additional Notes

- **Autocapture**: Enabled by default, automatically captures user interactions
- **Custom Host**: Using custom PostHog instance at `https://posthogv2.apessolutionsdev.com`
- **Event Timing**: Screen views are tracked on component mount, custom events on user interaction
- **Navigation**: All navigation uses Expo Router (`expo-router`)

---

## Contact & Support

For questions or issues regarding PostHog integration:
- Review PostHog documentation: https://posthog.com/docs
- Check PostHog React Native SDK: https://github.com/PostHog/posthog-react-native
- Contact the development team for app-specific questions

---

**Document Version**: 1.0  
**Last Updated**: [Date]  
**Maintained By**: Tech Team




