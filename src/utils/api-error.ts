export interface ApiError {
    message: string;  // 에러 메시지
    statusCode?: number;  // 상태 코드 (optional)
    error?: string;  // 에러 종류 (optional)
}

