const queryKeys = {
    AUTH: 'auth',
    GET_ACCESS_TOKEN: 'getAccessToken',
    GET_PROFILE: 'getProfile',
    MATCHING: 'matching',
} as const;

const storageKeys = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKeys, storageKeys};
