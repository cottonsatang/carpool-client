import {useMutation, useQuery,} from "@tanstack/react-query";
import {getAccessToken, getProfile, logout, postLogIn, postSignUp} from "../../api/auth";
import {UseMutationCustomOptions, UseQueryCustomOptions} from "../../types/common";
import {getEncryptStorage, removeEncryptStorage, setEncryptStorage} from "../../utils";
import {removeHeader, setHeader} from "../../utils/headers";
import {useEffect} from "react";
import queryClient from "../../api/queryClient";
import {numbers, queryKeys, storageKeys} from "../../constants";
import axiosInstance from "../../api/axios";

function useSignup(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postSignUp,
        ...mutationOptions,
    }); //onError: (error) => error,response.data.message ...로 구성됨  UseMutationCustomOptions에 정의함
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postLogIn,
        onSuccess: ({accessToken, refreshToken}) => {
            setEncryptStorage('refreshToken', refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`);
        },
        onSettled: () => {
            queryClient.refetchQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]});
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE]});
        },
        ...mutationOptions,
    });
}

function useGetRefreshToken() {
    const {isSuccess, data, isError} = useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: numbers.ACCESS_TOKEN_REFRESH_DURATION,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_DURATION,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        if (isSuccess) {
            setHeader('Authorization', `Bearer ${data.accessToken}`);
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) { //실패한다면
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        }
    }, [isError]);

    return {isSuccess, isError};
}

//type UseQueryCustomOptions <=> UseQueryOptions
function useGetProfile(queryOptions?: UseQueryCustomOptions) {
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...queryOptions,
    });
} //로그인 한 뒤에는 프로필도 가져와야함

// function useLogout(mutationOptions?: UseMutationCustomOptions) {
//     return useMutation({
//         mutationFn: logout,
//         onSuccess: () => {
//             console.log("before storage empty: ", getEncryptStorage(storageKeys.ACCESS_TOKEN));
//             removeHeader('Authorization');
//             removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//             queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
//             console.log("storage empty: ", getEncryptStorage(storageKeys.ACCESS_TOKEN));
//         },
//         ...mutationOptions,
//     });
// } ---> removeEncryptStorgage가 async라 따로 적용함

function useLogout(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: async () => {
            // 클라이언트에서 직접 로그아웃 처리
            removeHeader('Authorization');
            await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
            // await removeEncryptStorage(storageKeys.ACCESS_TOKEN); // accessToken도 제거
        },
        onSettled: () => {
            // 관련 쿼리 무효화하여 캐시 초기화
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
        },
        ...mutationOptions
    });
}

function useAuth() {
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
        enabled: refreshTokenQuery.isSuccess, //refreshToken 요청이 성공하면 프로필 쿼리도 가져오기
    });
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {isLogin, loginMutation, signupMutation, getProfileQuery, logoutMutation};
}

export default useAuth;
