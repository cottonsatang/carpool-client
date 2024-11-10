import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, View, Alert, Pressable, Text, ScrollView, Button} from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/queries/useAuth";
import {validateSignUp} from "../../utils";
import {colors} from "../../constants";
import TermsAndConditions from "../../components/TermsAndConditions";
import RoleSelection from "../../components/RoleSelection";
import EmailVerification from "./EmailVerification";

function SignUpScreen() {
    const scrollViewRef = useRef<ScrollView | null>(null);
    const passwordRef = useRef<TextInput | null>(null);
    const passwordConfirmRef = useRef<TextInput | null>(null);
    const phoneNumberRef = useRef<TextInput | null>(null);
    const vehicleModelRef = useRef<TextInput | null>(null);
    const licensePlateRef = useRef<TextInput | null>(null);
    const seatingCapacityRef = useRef<TextInput | null>(null);
    const {signupMutation, loginMutation} = useAuth();
    const [email, setEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [step, setStep] = useState(1);


    useEffect(() => {
        // step이 변경될 때 스크롤 위치를 맨 위로 초기화
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({y: 0, animated: true});
        }
    }, [step]);


    const signup = useForm({
        initialValue: {
            email: email, // 이메일 상태를 초기값으로 설정
            name: '',
            password: '',
            passwordConfirm: '',
            phoneNumber: '',
            role: undefined,
            vehicleModel: '',
            licensePlate: '',
            seatingCapacity: undefined,
        },
        validate: validateSignUp,
    });

    const handleSubmit = () => {
        const {
            email,
            name,
            password,
            passwordConfirm,
            phoneNumber,
            role,
            vehicleModel,
            licensePlate,
            seatingCapacity
        } = signup.values;

        // 유효성 검사
        if (!name || name.length < 4 || name.length > 20) {
            return Alert.alert('알림', '아이디는 4~20자 사이여야 합니다.');
        }

        if (password !== passwordConfirm) {
            return Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
        }

        if (!password.match(/^[a-zA-Z0-9]*$/)) {
            return Alert.alert('알림', '비밀번호는 영문과 숫자만 사용 가능합니다.');
        }

        if (!phoneNumber) {
            return Alert.alert('알림', '핸드폰 번호를 입력해주세요.');
        }

        // 기본 회원가입 데이터
        const signupData: {
            email: string;
            name: string;
            password: string;
            phoneNumber: string;
            role: 'driver' | 'passenger';
            vehicleInfo?: {
                model: string;
                licensePlate: string;
                seatingCapacity: number;
            };
        } = {
            email,
            name,
            password,
            phoneNumber,
            role: role as unknown as 'driver' | 'passenger',
        };

        // driver인 경우에만 vehicleInfo 추가
        if (role === 'driver') {
            if (!vehicleModel || !licensePlate || !seatingCapacity) {
                return Alert.alert('알림', '운전자 정보를 모두 입력해주세요.');
            }
            signupData.vehicleInfo = {
                model: vehicleModel,
                licensePlate,
                seatingCapacity: Number(seatingCapacity)
            };
        }

        signupMutation.mutate(
            signupData,
            {
                onSuccess: () => {
                    Alert.alert('알림', '회원가입이 완료되었습니다.');
                    loginMutation.mutate({ name, password });
                },
                onError: (error) => {
                    Alert.alert('회원가입 실패', error.message || '회원가입에 실패했습니다.');
                },
            }
        );
    };

    const handleEmailVerificationAlert = () => {
        Alert.alert("알림", "이메일 인증을 완료해 주세요.");
    };

    return (
        <DismissKeyboardView>
            <SafeAreaView style={styles.container}>
                {step === 1 ? (
                    <ScrollView>
                        <TermsAndConditions/>
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                label="약관에 동의하고 계속하기"
                                onPress={() => {
                                    setStep(2);
                                }}
                            />
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView>
                        <View style={styles.inputContainer}>
                            <EmailVerification
                                email={signup.values.email}
                                setEmail={(value) => signup.setFieldValue('email', value)}
                                isEmailVerified={isEmailVerified}
                                setIsEmailVerified={setIsEmailVerified}
                            />
                            <InputField
                                placeholder="아이디"
                                error={signup.errors.name}
                                touched={signup.touched.name}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => passwordRef.current?.focus()}
                                {...signup.getTextInputProps("name")}
                            />
                            <InputField
                                ref={passwordRef}
                                placeholder="비밀번호"
                                error={signup.errors.password}
                                touched={signup.touched.password}
                                secureTextEntry
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => passwordConfirmRef.current?.focus()}
                                {...signup.getTextInputProps("password")}
                            />
                            <InputField
                                ref={passwordConfirmRef}
                                placeholder="비밀번호 확인"
                                error={signup.errors.passwordConfirm}
                                touched={signup.touched.passwordConfirm}
                                secureTextEntry
                                {...signup.getTextInputProps("passwordConfirm")}
                            />
                            <InputField
                                ref={phoneNumberRef}
                                placeholder="핸드폰 번호"
                                error={signup.errors.phoneNumber}
                                touched={signup.touched.phoneNumber}
                                {...signup.getTextInputProps("phoneNumber")}
                            />
                            <RoleSelection
                                selectedRole={signup.values.role}
                                onSelectRole={(role) => signup.getTextInputProps("role").onChangeText(role)}
                            />
                            {signup.values.role === 'driver' && (
                                <>
                                    <InputField
                                        ref={vehicleModelRef}
                                        placeholder="차량 모델"
                                        error={signup.errors.vehicleModel}
                                        touched={signup.touched.vehicleModel}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => licensePlateRef.current?.focus()}
                                        {...signup.getTextInputProps("vehicleModel")}
                                    />
                                    <InputField
                                        ref={licensePlateRef}
                                        placeholder="차량 번호"
                                        error={signup.errors.licensePlate}
                                        touched={signup.touched.licensePlate}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => seatingCapacityRef.current?.focus()}
                                        {...signup.getTextInputProps("licensePlate")}
                                    />
                                    <InputField
                                        ref={seatingCapacityRef}
                                        placeholder="좌석 수"
                                        error={signup.errors.seatingCapacity}
                                        touched={signup.touched.seatingCapacity}
                                        keyboardType="numeric"
                                        {...signup.getTextInputProps("seatingCapacity")}
                                    />
                                </>
                            )}
                            <CustomButton
                                label={isEmailVerified ? "회원가입" : "이메일 인증을 해주세요"}
                                onPress={isEmailVerified ? handleSubmit : handleEmailVerificationAlert}  // 이메일 인증이 안 됐을 경우 알림을 띄우기
                                inValid={!isEmailVerified}  // 인증이 안 됐으면 비활성화 스타일 적용
                                variant="filled"
                                size="large"
                            />
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </DismissKeyboardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    buttonContainer: {
        padding: 20,
    },
    agreeButton: {
        backgroundColor: colors.BLUE_ACTIVE,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: colors.GRAY_300,
    },
    agreeButtonText: {
        color: colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        gap: 20,
        marginBottom: 30,
    },
});

export default SignUpScreen;
