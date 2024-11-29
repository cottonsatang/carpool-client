import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogIn,
  postSignUp, ResponseProfile,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import {
  getEncryptStorage,
  removeEncryptStorage,
  setEncryptStorage,
} from '../../utils';
import {removeHeader, setHeader} from '../../utils/headers';
import {useEffect, useMemo} from 'react';
import queryClient from '../../api/queryClient';
import {numbers, queryKeys, storageKeys} from '../../constants';
import axiosInstance from '../../api/axios';
import RNRestart from 'react-native-restart';

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
      queryClient.removeQueries({queryKey: [queryKeys.GET_PROFILE]});
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage('refreshToken', refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
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
    if (isError) {
      //실패한다면
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
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
      queryClient.clear();
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess && loginMutation.isSuccess, // refreshToken이 성공한 경우에만 프로필 쿼리 실행
  });

  const isLoading = getProfileQuery.isLoading;

  const isLogin = getProfileQuery.isSuccess;
  const role = useMemo(() => {
    if (!getProfileQuery.data) return undefined;
    return (getProfileQuery.data as ResponseProfile)?.role;
  }, [getProfileQuery.data]);

  return {
    isLoading,
    isLogin,
    loginMutation,
    signupMutation,
    getProfileQuery,
    logoutMutation,
    role
  };
}

export default useAuth;
