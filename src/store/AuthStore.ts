import { create } from 'zustand';
import {getProfile, postLogIn, logout, ResponseProfile} from '../api/auth';
import { setHeader, removeHeader } from '../utils/headers';
import {setEncryptStorage, removeEncryptStorage, getEncryptStorage} from '../utils/encryptStorage';
import {useEffect} from "react";

interface AuthState {
    isLoading: boolean;
    isLogin: boolean;
    profile: ResponseProfile | null;

    // 액션
    login: (credentials: { name: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;  // 앱 시작시 인증 체크
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoading: true,
    isLogin: false,
    profile: null,

    login: async (credentials) => {
        set({ isLoading: true });
        try {
            // 1. 로그인
            const { accessToken, refreshToken } = await postLogIn(credentials);

            // 2. 토큰 저장
            setHeader('Authorization', `Bearer ${accessToken}`);
            await setEncryptStorage('refreshToken', refreshToken);

            // 3. 프로필 가져오기
            const profile = await getProfile();

            set({
                isLogin: true,
                profile,
                isLoading: false
            });
        } catch (error) {
            console.error('Login failed:', error);
            set({ isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            removeHeader('Authorization');
            await removeEncryptStorage('refreshToken');
            set({
                isLogin: false,
                profile: null,
                isLoading: false
            });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const refreshToken = await getEncryptStorage('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token');
            }

            // 프로필 정보로 로그인 상태 확인
            const profile = await getProfile();
            set({
                isLogin: true,
                profile,
            });
        } catch (error) {
            // 에러 시 초기화
            removeHeader('Authorization');
            await removeEncryptStorage('refreshToken');
            set({ isLogin: false, profile: null });
        } finally {
            set({ isLoading: false });
        }
    },
}));
