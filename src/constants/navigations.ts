const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  PROFILE: 'Profile',
  POINTS_HISTORY: 'PointsHistory', // 포인트 내역 경로 추가
  USAGE_HISTORY: 'UsageHistory',   // 이용 내역 경로 추가
  NOTIFICATION: 'Notification', // 알림 추가
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mapNavigations = {
  MAP_HOME: 'MAP_HOME',
  CHAT: 'CHAT',
} as const;

export {mainNavigations, authNavigations, mapNavigations};
