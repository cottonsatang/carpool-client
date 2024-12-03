import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../constants';
import * as matchingApi from '../../api/matching';

export function useMatching() {
    const queryClient = useQueryClient();

    const requestMatchingMutation = useMutation({
        mutationFn: matchingApi.requestMatching,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.MATCHING] });
        },
    });

    const cancelMatchingMutation = useMutation({
        mutationFn: matchingApi.cancelMatching,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.MATCHING] });
        },
    });

    const leaveMatchMutation = useMutation({
        mutationFn: matchingApi.leaveMatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.MATCHING] });
        },
    });

    const agreeToStartRideMutation = useMutation({
        mutationFn: matchingApi.agreeToStartRide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.MATCHING] });
        },
    });

    const completeRideMutation = useMutation({
        mutationFn: matchingApi.completeRide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.MATCHING] });
        },
    });

    return {
        requestMatchingMutation,
        cancelMatchingMutation,
        leaveMatchMutation,
        agreeToStartRideMutation,
        completeRideMutation,
    };
}

export function useMatchingStatus(key: string) {
    return useQuery({
        queryKey: [queryKeys.MATCHING, 'status', key],
        queryFn: () => matchingApi.getMatchingStatus(key),
        enabled: !!key,
        refetchInterval: 5000,
        retry: 1,
    });
}
