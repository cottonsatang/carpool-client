import { useMutation, useQuery } from '@tanstack/react-query';
import {requestMatching, cancelMatching, getMatchingStatus} from "../../api/matching";
import {queryKeys} from "../../constants";
import {UseMutationCustomOptions, UseQueryCustomOptions} from "../../types/common";

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

function useGetMatchingStatus(matchId: string, queryOptions?: UseQueryCustomOptions) {
    return useQuery({
        queryKey: [queryKeys.MATCHING, 'status', matchId],
        queryFn: () => getMatchingStatus(matchId),
        enabled: !!matchId,
        staleTime: 0,  // 항상 최신 데이터를 가져오기
        refetchInterval: 5000,  // 5초마다 상태 체크
        ...queryOptions,
    });
}

function useMatching() {
    const requestMatchingMutation = useRequestMatching();
    const cancelMatchingMutation = useCancelMatching();

    return {
        requestMatchingMutation,
        cancelMatchingMutation,
        useGetMatchingStatus,  // 이건 따로 matchId를 받아야 해서 함수로 제공
    };
}

export { useMatching as default, useGetMatchingStatus };
