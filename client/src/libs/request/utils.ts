// prettier-ignore
export const ErrorCodes = {
    // -------------- Token Expiry Code ---------------
   TOKEN_EXPIRED_ERROR                : 5000,
   TOKEN_AUTH_FAILED_ERROR            : 5001,
   INVALID_TOKEN_ERROR                : 5002,
   NO_TOKEN_PROVIDED_ERROR            : 5003,
    // -------------- User Authentication ---------------
    ALREADY_ACTIVATED: 100011,
    USER_NOT_FOUND: 10001,
    INVALID_RESET_TOKEN: 10007,
    ACCOUNT_EMAIL_NOT_FOUND: 100013,
    // -------------- User Assets ---------------
    ASSETS_LIMIT_REACHED: 60011,
    // -------------- PreRecorded ---------------
    // -------------- User Authentications ------
    // -------------- Video File  -------------
    NO_MORE_INFORMATION_OF_VIDEO_FILE :451238292,
    // -------------- Destinations -------------
    DUPLICATE_DESTINATION_CONNECTED: 50002,
    ON_DELETE_DESTINATION_EVENT_FOUND: 50006,
    // -------------- Hosted pages -------------
    HOSTED_PAGES_EVENT_FOUND: 19017,
    // --------------TEAM -------------
    TEAM_PERMISSION_DENIED: 90026,
  
    // -------------- Affiliates -------------
   
   AFFILIATE_NOT_EXIST : 120000,
   AFFILIATE_PAYMENT_METHOD_NOT_SETUP : 120001,
   AFFILIATE_PAYOUT_NOT_FOUND : 120002,
  
  } as const
