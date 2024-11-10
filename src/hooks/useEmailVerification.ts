import {useMutation} from "@tanstack/react-query";
import {sendVerificationCode, verifyCode} from "../api/auth";

function useEmailVerification() {
    // 인증 코드 전송 mutation
    const sendCodeMutation = useMutation({
        mutationFn: sendVerificationCode,
        onError: (error: Error) => {
            console.error('Send verification code error:', error);
        }
    });

    // 인증 코드 확인 mutation
    const verifyCodeMutation = useMutation({
        mutationFn: ({email, code}: { email: string; code: string }) =>
            verifyCode(email, code),
        onError: (error: Error) => {
            console.error('Verify code error:', error);
        }
    });

    return {
        sendCode: sendCodeMutation.mutate,
        verifyCode: verifyCodeMutation.mutate,
        isSendingCode: sendCodeMutation.isPending,
        isVerifying: verifyCodeMutation.isPending,
        sendCodeError: sendCodeMutation.error,
        verifyCodeError: verifyCodeMutation.error
    };
}

export default useEmailVerification;

