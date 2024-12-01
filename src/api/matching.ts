import axiosInstance from "./axios";
import { AxiosError } from "axios";
import {MatchingStatus} from "../constants/matchingStatus";

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
    message: string;
    matchId?: string;
    status?: MatchingStatus
    rideRequestId?: number;
}


const requestMatching = async (data: MatchingRequest): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post('/matching/request', data);
        return response.data;
    } catch (error) {
        return handleApiError(error, data, '매칭 요청에 실패했습니다.');
    }
};


const cancelMatching = async (key: string): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post('/matching/cancel', { key });
        return response.data;
    } catch (error) {
        return handleApiError(error, { key }, '매칭 취소에 실패했습니다.');
    }
};

const getMatchingStatus = async (key: string): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post('/matching/status', { key });
        return response.data;
    } catch (error) {
        return handleApiError(error, { key }, '매칭 상태 확인에 실패했습니다.');
    }
};

const agreeToStartRide = async (rideRequestId: number): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post('/matching/agree', { rideRequestId });
        return response.data;
    } catch (error) {
        return handleApiError(error, { rideRequestId }, '운행 동의에 실패했습니다.');
    }
};

const completeRide = async (rideRequestId: number): Promise<MatchingResponse> => {
    try {
        const response = await axiosInstance.post('/matching/complete', { rideRequestId });
        return response.data;
    } catch (error) {
        return handleApiError(error, { rideRequestId }, '운행 완료에 실패했습니다.');
    }
};

const handleApiError = (
    error: any,
    requestData: any,
    defaultMessage: string
): MatchingResponse => {
    if (error instanceof AxiosError) {
        const errorData = error.response?.data as ApiError;
        console.error('API 요청 에러:', { requestData, error: errorData || error.message });
        return { message: errorData?.message || defaultMessage, status: undefined };
    }
    console.error('알 수 없는 에러:', error);
    return { message: defaultMessage, status: undefined };
};

export {
    requestMatching,
    cancelMatching,
    getMatchingStatus,
    agreeToStartRide,
    completeRide,
};

export type {
    MatchingRequest,
    MatchingResponse,
};
