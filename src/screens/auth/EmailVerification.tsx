import React, {useState} from "react";
import {View, Pressable, Text, TextInput, StyleSheet, Alert} from "react-native";
import {colors} from "../../constants";
import useEmailVerification from "../../hooks/useEmailVerification";
import InputField from "../../components/InputField";

interface EmailVerificationProps {
    email: string;
    setEmail: (email: string) => void;
    isEmailVerified: boolean;
    setIsEmailVerified: (verified: boolean) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
                                                                 email,
                                                                 setEmail,
                                                                 isEmailVerified,
                                                                 setIsEmailVerified,
                                                             }) => {
    const [verificationCode, setVerificationCode] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);

    const {
        sendCode,
        verifyCode,
        isSendingCode,
        isVerifying,
    } = useEmailVerification();

    const validateEmail = (email: string) => {
        if (!email) {
            return "이메일을 입력해주세요";
        }
        if (!/^[A-Za-z0-9._%+-]+@mju\.ac\.kr$/.test(email)) {
            return "명지대학교 이메일(@mju.ac.kr)만 사용 가능합니다";
        }
        return "";
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailTouched(true);
        setEmailError(validateEmail(text));
    };

    const handleSendCode = async () => {
        const error = validateEmail(email);
        if (error) {
            Alert.alert("알림", error);
            return;
        }

        sendCode(email, {
            onSuccess: () => {
                Alert.alert("알림", "인증 코드가 이메일로 전송되었습니다.");
            },
            onError: (error: Error) => {
                console.error('Verification code request failed:', {
                    error: error.message,
                    email: email
                });
                Alert.alert("오류", error.message);
            }
        });
    };

    const handleVerifyCode = async () => {
        if (verificationCode.length !== 6) {
            Alert.alert("알림", "6자리 인증 코드를 입력해주세요");
            return;
        }

        verifyCode({email, code: verificationCode}, {
            onSuccess: (isValid) => {
                if (isValid) {
                    setIsEmailVerified(true);
                    Alert.alert("알림", "이메일 인증이 완료되었습니다.");
                } else {
                    Alert.alert("알림", "인증 코드가 올바르지 않습니다.");
                }
            },
            onError: (error) => {
                Alert.alert("오류", error.message);
            }
        });
    };

    return (
        <View style={styles.container}>
            <InputField
                placeholder="이메일을 입력해주세요"
                onChangeText={handleEmailChange}
                onBlur={() => setEmailTouched(true)}
                error={emailError}
                touched={emailTouched}
                disabled={isEmailVerified}
                keyboardType="email-address"
                style={styles.emailInput}
            />
            <Pressable
                style={[styles.button, isEmailVerified && styles.disabledButton]}
                disabled={isSendingCode || isEmailVerified}
                onPress={handleSendCode}
            >
                <Text style={styles.buttonText}>
                    {isSendingCode ? "전송중..." : "인증코드 전송"}
                </Text>
            </Pressable>

            {!isEmailVerified && (
                <View style={styles.verificationContainer}>
                    <TextInput
                        style={styles.verificationInput}
                        placeholder="인증 코드 입력"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        maxLength={6}
                        keyboardType="number-pad"
                        placeholderTextColor={colors.GRAY_500}
                    />
                    <Pressable
                        style={[
                            styles.button,
                            verificationCode.length !== 6 && styles.disabledButton
                        ]}
                        disabled={verificationCode.length !== 6 || isVerifying}
                        onPress={handleVerifyCode}
                    >
                        <Text style={styles.buttonText}>
                            {isVerifying ? "확인중..." : "확인"}
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        gap: 20,
        marginBottom: 30,
    },
    emailInput: {
        fontSize: 16,
        color: colors.BLACK,
        padding: 0,
        flex: 1,
    },
    button: {
        backgroundColor: colors.BLUE_700,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        minWidth: 100,
    },
    disabledButton: {
        backgroundColor: colors.GRAY_300,
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: 16,
    },
    verificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        gap: 10,
    },
    verificationInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        padding: 10,
        fontSize: 16,
        color: colors.BLACK,
    },
});

export default EmailVerification;
