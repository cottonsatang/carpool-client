import { useMutation, useQuery } from '@tanstack/react-query';
import {
    requestMatching,
    cancelMatching,
    getMatchingStatus,
    agreeToStartRide,
    completeRide,
} from "../../api/matching";
import { queryKeys } from "../../constants";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "../../types/common";


function useRequestMatching(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: requestMatching,
        onSuccess: (data) => {
            console.log('매칭 요청 성공:', data);
        },
        ...mutationOptions,
    });
}

function useCancelMatching(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: cancelMatching,
        onSuccess: () => {
            console.log('매칭 취소 성공');
        },
        ...mutationOptions,
    });
}

function useGetMatchingStatus(key: string, queryOptions?: UseQueryCustomOptions) {
    return useQuery({
        queryKey: [queryKeys.MATCHING, 'status', key],
        queryFn: () => getMatchingStatus(key),
        enabled: !!key,
        staleTime: 0,
        refetchInterval: 5000,
        ...queryOptions,
    });
}


function useAgreeToStartRide(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: agreeToStartRide,
        onSuccess: (data) => {
            console.log('운행 동의 성공:', data);
        },
        ...mutationOptions,
    });
}

function useCompleteRide(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: completeRide,
        onSuccess: (data) => {
            console.log('운행 완료 성공:', data);
        },
        ...mutationOptions,
    });
}

function useMatching() {
    const requestMatchingMutation = useRequestMatching();
    const cancelMatchingMutation = useCancelMatching();
    const agreeToStartRideMutation = useAgreeToStartRide();
    const completeRideMutation = useCompleteRide();

    return {
        requestMatchingMutation,
        cancelMatchingMutation,
        agreeToStartRideMutation,
        completeRideMutation,
        useGetMatchingStatus,
    };
}

export { useMatching as default, useGetMatchingStatus };
