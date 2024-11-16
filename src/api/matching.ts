// src/api/matching.ts
import axiosInstance from "./axios";
import { AxiosError } from "axios";

interface ApiError {
    message: string;
    statusCode?: number;
    error?: string;
}

// Request types
interface MatchingRequest {
    startPoint: number;
    endPoint: number;
    requestTime: string;
}

interface MatchingResponse {
    matchId: string;
    status: 'pending' | 'matched' | 'canceled';
    message: string;
}

const requestMatching = async (data: MatchingRequest): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post('/matching/request', data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorData = error.response?.data as ApiError;
            console.error("매칭 요청 에러:", {
                requestData: data,
                error: errorData || error.message
            });
            throw new Error(errorData?.message || error.message || '매칭 요청에 실패했습니다.');
        }
        throw error;
    }
};

const cancelMatching = async (matchId: string): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post(`/matching/cancel/${matchId}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorData = error.response?.data as ApiError;
            throw new Error(errorData?.message || error.message || '매칭 취소에 실패했습니다.');
        }
        throw error;
    }
};

const getMatchingStatus = async (matchId: string): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.get(`/matching/status/${matchId}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorData = error.response?.data as ApiError;
            throw new Error(errorData?.message || error.message || '매칭 상태 확인에 실패했습니다.');
        }
        throw error;
    }
};

export {
    requestMatching,
    cancelMatching,
    getMatchingStatus
};

export type {
    MatchingRequest,
    MatchingResponse
};
